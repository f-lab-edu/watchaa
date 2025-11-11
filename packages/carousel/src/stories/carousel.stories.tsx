import { fn } from 'storybook/test';

import { Carousel, type CarouselRootProps } from '..';

import type { Meta, StoryObj } from '@storybook/react-vite';

const sampleItems = [
  { id: 1, color: 'bg-blue-500', label: 'Slide 1' },
  { id: 2, color: 'bg-green-500', label: 'Slide 2' },
  { id: 3, color: 'bg-purple-500', label: 'Slide 3' },
  { id: 4, color: 'bg-red-500', label: 'Slide 4' },
  { id: 5, color: 'bg-yellow-500', label: 'Slide 5' },
  { id: 6, color: 'bg-pink-500', label: 'Slide 6' },
  { id: 7, color: 'bg-indigo-500', label: 'Slide 7' },
  { id: 8, color: 'bg-teal-500', label: 'Slide 8' },
];

const defaultArgs: Pick<
  CarouselRootProps,
  'mode' | 'loop' | 'autoInterval' | 'initialIndex' | 'slidesPerView' | 'spaceBetween'
> = {
  mode: 'manual',
  loop: false,
  autoInterval: 5000,
  initialIndex: 0,
  slidesPerView: 1,
  spaceBetween: 0,
};

const meta = {
  title: 'Components/Carousel',
  component: Carousel.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loop: {
      control: 'boolean',
      description: 'Enable infinite loop (automatically set to true when mode is "auto")',
      table: {
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'mode', neq: 'auto' }, // mode가 'auto'일 때는 loop 컨트롤 숨기기
    },
  },
  args: { onSlideChange: fn() },
} satisfies Meta<typeof Carousel.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: defaultArgs,
  render: (args) => (
    <div className="w-[600px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {sampleItems.map((item) => (
            <div
              key={item.id}
              className={`${item.color} h-32 flex items-center justify-center text-white text-2xl font-bold`}
            >
              {item.label}
            </div>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton />
        <Carousel.NextButton />
        {args.slidesPerView === 1 && (
          <Carousel.Pagination
            containerClassName="mt-4 absolute left-1/2 -translate-x-1/2"
            dotClassName="bg-blue-300"
            activeDotClassName="bg-blue-500"
          />
        )}
      </Carousel.Root>
    </div>
  ),
};

export const InfiniteLoop: Story = {
  args: {
    ...defaultArgs,
    loop: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {sampleItems.map((item) => (
            <div
              key={item.id}
              className={`${item.color} h-32 flex items-center justify-center text-white text-2xl font-bold`}
            >
              {item.label}
            </div>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton />
        <Carousel.NextButton />
        {args.slidesPerView === 1 && (
          <Carousel.Pagination
            containerClassName="mt-4 absolute left-1/2 -translate-x-1/2"
            dotClassName="bg-blue-300"
            activeDotClassName="bg-blue-500"
          />
        )}
      </Carousel.Root>
    </div>
  ),
};

export const WithAutoPlay: Story = {
  args: {
    ...defaultArgs,
    mode: 'auto',
    autoInterval: 2000,
  },
  render: (args) => (
    <div className="w-[600px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {sampleItems.map((item) => (
            <div
              key={item.id}
              className={`${item.color} h-32 flex items-center justify-center text-white text-2xl font-bold`}
            >
              {item.label}
            </div>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton />
        <Carousel.NextButton />
        {args.slidesPerView === 1 && (
          <Carousel.Pagination
            containerClassName="mt-4 absolute left-1/2 -translate-x-1/2"
            dotClassName="bg-blue-300"
            activeDotClassName="bg-blue-500"
          />
        )}
        <Carousel.ProgressBar />
      </Carousel.Root>
    </div>
  ),
};

export const MultipleSlides: Story = {
  args: {
    ...defaultArgs,
    slidesPerView: 3,
    spaceBetween: 16,
  },
  render: (args) => (
    <div className="w-[800px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {sampleItems.map((item) => (
            <div
              key={item.id}
              className={`${item.color} h-32 flex items-center justify-center text-white text-xl font-bold`}
            >
              {item.label}
            </div>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton />
        <Carousel.NextButton />
        {args.slidesPerView === 1 && (
          <Carousel.Pagination
            containerClassName="mt-4 absolute left-1/2 -translate-x-1/2"
            dotClassName="bg-blue-300"
            activeDotClassName="bg-blue-500"
          />
        )}
      </Carousel.Root>
    </div>
  ),
};

export const CustomGap: Story = {
  args: {
    ...defaultArgs,
    slidesPerView: 2,
    spaceBetween: 32,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <Carousel.Root {...args}>
        <Carousel.Content>
          {sampleItems.map((item) => (
            <div
              key={item.id}
              className={`${item.color} h-32 flex items-center justify-center text-white text-2xl font-bold`}
            >
              {item.label}
            </div>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton />
        <Carousel.NextButton />
        {args.slidesPerView === 1 && (
          <Carousel.Pagination
            containerClassName="mt-4 absolute left-1/2 -translate-x-1/2"
            dotClassName="bg-blue-300"
            activeDotClassName="bg-blue-500"
          />
        )}
      </Carousel.Root>
    </div>
  ),
};

export const CustomButtons: Story = {
  args: {
    ...defaultArgs,
    loop: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {sampleItems.map((item) => (
            <div
              key={item.id}
              className={`${item.color} h-32 flex items-center justify-center text-white text-2xl font-bold`}
            >
              {item.label}
            </div>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton className="-left-14 bg-white/80 hover:bg-white rounded-full size-12 shadow-lg">
          <span className="text-2xl text-gray-800">{'<'}</span>
        </Carousel.PrevButton>
        <Carousel.NextButton className="-right-14 bg-white/80 hover:bg-white rounded-full size-12 shadow-lg">
          <span className="text-2xl text-gray-800">{'>'}</span>
        </Carousel.NextButton>
        {args.slidesPerView === 1 && (
          <Carousel.Pagination
            containerClassName="mt-4 absolute left-1/2 -translate-x-1/2"
            dotClassName="bg-gray-400"
            activeDotClassName="bg-gray-800"
          />
        )}
      </Carousel.Root>
    </div>
  ),
};
