import type { Meta, StoryObj } from "@storybook/react-vite";
import figma from "@figma/code-connect";
import { Footer } from "./Footer";

// Generic placeholder standing in for a brand logo in the examples.
const LogoPlaceholder = () => (
  <svg
    width="96"
    height="24"
    viewBox="0 0 96 24"
    role="img"
    aria-label="Logo"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="96" height="24" rx="4" fill="#d1d0cd" />
    <text
      x="48"
      y="16"
      textAnchor="middle"
      fontFamily="sans-serif"
      fontSize="11"
      fill="#000000"
    >
      LOGO
    </text>
  </svg>
);

const sampleLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const sampleCopyright = "© 2026 Example, Inc. All rights reserved.";

function FigmaExampleApp() {
  return (
    <Footer
      type="app"
      copyright={sampleCopyright}
      links={sampleLinks}
      logo={<LogoPlaceholder />}
    />
  );
}

function FigmaExampleWebsite() {
  return <Footer type="website" copyright={sampleCopyright} />;
}

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {
    docs: {
      description: {
        component:
          "Page footer with two variants: `app` shows the copyright at the start with trailing links and an optional logo, while `website` shows a centered copyright only.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/CvzXFVVdFq17ZpenRXfZ2I/Serendie-Design-System--Community-?node-id=1-12666",
      props: {
        type: figma.enum("Type", {
          Default: "app",
          "Copyright only": "website",
        }),
      },
      examples: [
        {
          example: FigmaExampleApp,
          variant: { Type: "Default" },
        },
        {
          example: FigmaExampleWebsite,
          variant: { Type: "Copyright only" },
        },
      ],
    },
    controls: {
      expanded: true,
    },
  },
};

type Story = StoryObj<typeof Footer>;
export default meta;

export const App: Story = {
  args: {
    type: "app",
    copyright: sampleCopyright,
    links: sampleLinks,
    logo: <LogoPlaceholder />,
  },
  render: (args) => <Footer {...args} />,
};

export const Website: Story = {
  args: {
    type: "website",
    copyright: sampleCopyright,
  },
  render: (args) => <Footer {...args} />,
};

export const All: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <Footer
        type="app"
        copyright={sampleCopyright}
        links={sampleLinks}
        logo={<LogoPlaceholder />}
      />
      <Footer type="website" copyright={sampleCopyright} />
    </div>
  ),
};
