import type { Metadata } from 'next';

export const title = 'Debug Request';

const meta: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
};

export default meta;
