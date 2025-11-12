import { dirname, relative } from 'node:path';

/**
 * 파일 경로에서 패키지 디렉토리 경로를 찾습니다.
 * @param {string} filePath - 파일의 절대 경로
 * @returns {string | null} 패키지 디렉토리 경로 (예: 'apps/movii') 또는 null
 */
const findPackageDir = (filePath) => {
  const parts = dirname(filePath).split('/');
  const workspaceIndex = parts.findIndex(
    (part) => part === 'apps' || part === 'packages'
  );

  return workspaceIndex !== -1
    ? parts.slice(0, workspaceIndex + 2).join('/')
    : null;
};

/**
 * 파일들을 패키지별로 그룹화합니다.
 * @param {Array<{filename: string, packageDir: string | null}>} fileEntries - 파일 정보 배열
 * @returns {Record<string, string[]>} 패키지 디렉토리별 파일 목록
 */
const groupByPackage = (fileEntries) =>
  fileEntries.reduce((acc, { packageDir, filename }) => {
    if (packageDir) {
      return { ...acc, [packageDir]: [...(acc[packageDir] || []), filename] };
    }

    return acc;
  }, {});

/**
 * 각 패키지에서 ESLint를 실행하는 명령어를 생성합니다.
 * @param {Record<string, string[]>} packageGroups - 패키지별 파일 그룹
 * @returns {string[]} ESLint 실행 명령어 배열
 */
const createEslintCommands = (packageGroups) =>
  Object.entries(packageGroups).map(([packageDir, files]) => {
    const relativeFiles = files.map((f) => relative(packageDir, f)).join(' ');
    return `cd ${packageDir} && eslint --fix ${relativeFiles}`;
  });

/**
 * Prettier 포맷팅 명령어를 생성합니다.
 * @param {Record<string, string[]>} packageGroups - 패키지별 파일 그룹
 * @returns {string[]} Prettier 실행 명령어 배열
 */
const createPrettierCommands = (packageGroups) =>
  Object.entries(packageGroups).map(([packageDir, files]) => {
    const relativeFiles = files.map((f) => relative(packageDir, f)).join(' ');
    return `cd ${packageDir} && prettier --write ${relativeFiles}`;
  });

export default {
  '**/*.{ts,tsx}': (filenames) => {
    const fileEntries = filenames.map((filename) => ({
      filename,
      packageDir: findPackageDir(filename),
    }));
    const packageGroups = groupByPackage(fileEntries);
    const eslintCommands = createEslintCommands(packageGroups);
    const prettierCommands = createPrettierCommands(packageGroups);

    return [...eslintCommands, ...prettierCommands];
  },
};
