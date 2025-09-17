import { PlaceHolderImages } from './placeholder-images';

export type TemplateContent = Record<string, string>;

export interface TemplateTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor1: string;
  accentColor2: string;
  headlineFont: string;
  bodyFont: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  html: (content: TemplateContent) => string;
  css: (theme: TemplateTheme) => string;
  initialContent: TemplateContent;
  initialTheme: Omit<TemplateTheme, 'headlineFont' | 'bodyFont'>;
}

const aboutMeImage = PlaceHolderImages.find(p => p.id === 'about-me-image');

const commonCSS = (theme: TemplateTheme) => `
  :root {
    --primary-color: ${theme.primaryColor};
    --secondary-color: ${theme.secondaryColor};
    --background-color: ${theme.backgroundColor};
    --text-color: ${theme.textColor};
    --accent-color-1: ${theme.accentColor1};
    --accent-color-2: ${theme.accentColor2};
    --headline-font: '${theme.headlineFont}', serif;
    --body-font: '${theme.bodyFont}', sans-serif;
  }
  
  body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: var(--body-font);
    margin: 0;
    padding: 0;
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1, h2, h3 {
    font-family: var(--headline-font);
    color: var(--primary-color);
    font-weight: 700;
  }

  .btn {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background-color: var(--secondary-color);
  }
`;

export const templates: Template[] = [
  {
    id: 'minimalist-portfolio',
    name: 'Minimalist Portfolio',
    description: 'A clean and elegant template perfect for artists, designers, and photographers.',
    initialContent: {
      headline: "Jane Doe",
      subheadline: "Digital Artist & Illustrator",
      cta: "View My Work",
      about_heading: "About Me",
      about_text: "I am a passionate digital artist with a love for vibrant colors and whimsical themes. My work explores the intersection of nature and technology.",
      footer_text: `© ${new Date().getFullYear()} Jane Doe. All rights reserved.`
    },
    initialTheme: {
      primaryColor: '#333333',
      secondaryColor: '#777777',
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      accentColor1: '#F0F0F0',
      accentColor2: '#CCCCCC',
    },
    html: (content: TemplateContent) => `
      <header class="container" style="text-align: center; padding: 4rem 2rem;">
        <h1 data-editable-id="headline" style="font-size: 3rem; margin: 0;">${content.headline}</h1>
        <p data-editable-id="subheadline" style="font-size: 1.2rem; margin-top: 0.5rem; color: var(--secondary-color);">${content.subheadline}</p>
      </header>
      <main>
        <section class="container" style="display: flex; align-items: center; gap: 2rem; padding-bottom: 4rem;">
          <div style="flex: 1;">
            <h2 data-editable-id="about_heading" style="border-bottom: 2px solid var(--accent-color-1); padding-bottom: 0.5rem;">${content.about_heading}</h2>
            <p data-editable-id="about_text">${content.about_text}</p>
          </div>
          <div style="flex: 0 0 200px;">
            <img data-editable-id="about_image" src="${aboutMeImage?.imageUrl}" alt="About me" style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover; border: 5px solid var(--accent-color-1);" />
          </div>
        </section>
      </main>
      <footer style="text-align: center; padding: 2rem; background-color: var(--accent-color-1);">
        <p data-editable-id="footer_text">${content.footer_text}</p>
      </footer>
    `,
    css: (theme) => commonCSS(theme),
  },
  {
    id: 'bold-startup',
    name: 'Bold Startup',
    description: 'A modern and energetic template for startups and tech companies.',
    initialContent: {
      nav_brand: "InnovateX",
      hero_headline: "The Future of Innovation is Here.",
      hero_subheadline: "We build cutting-edge solutions that drive progress and transform industries.",
      hero_cta: "Get Started",
      footer_text: `© ${new Date().getFullYear()} InnovateX. All rights reserved.`
    },
    initialTheme: {
      primaryColor: '#007BFF',
      secondaryColor: '#0056b3',
      backgroundColor: '#FFFFFF',
      textColor: '#212529',
      accentColor1: '#F8F9FA',
      accentColor2: '#E9ECEF',
    },
    html: (content: TemplateContent) => `
      <nav style="background-color: var(--background-color); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem;">
          <h3 data-editable-id="nav_brand" style="margin: 0; color: var(--primary-color);">${content.nav_brand}</h3>
        </div>
      </nav>
      <header style="background: linear-gradient(45deg, var(--primary-color), var(--secondary-color)); color: white; text-align: center; padding: 6rem 2rem;">
        <h1 data-editable-id="hero_headline" style="font-size: 3.5rem; margin: 0; color: white;">${content.hero_headline}</h1>
        <p data-editable-id="hero_subheadline" style="font-size: 1.2rem; max-width: 600px; margin: 1rem auto;">${content.hero_subheadline}</p>
        <a href="#" class="btn" style="background-color: white; color: var(--primary-color); margin-top: 1rem;">${content.hero_cta}</a>
      </header>
      <footer style="text-align: center; padding: 2rem; background-color: var(--accent-color-1); border-top: 1px solid var(--accent-color-2);">
        <p data-editable-id="footer_text">${content.footer_text}</p>
      </footer>
    `,
    css: (theme) => commonCSS(theme),
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    description: 'A vibrant and artistic template for creative agencies and studios.',
    initialContent: {
      headline: "Art & Code",
      subheadline: "We design and build beautiful digital experiences.",
      cta: "Our Portfolio",
      footer_text: `© ${new Date().getFullYear()} Art & Code Studio.`
    },
    initialTheme: {
      primaryColor: '#e91e63',
      secondaryColor: '#c2185b',
      backgroundColor: '#212121',
      textColor: '#FFFFFF',
      accentColor1: '#424242',
      accentColor2: '#616161',
    },
    html: (content: TemplateContent) => `
      <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; background-color: var(--background-color);">
        <h1 data-editable-id="headline" style="font-size: 5rem; color: var(--primary-color); margin: 0; line-height: 1;">${content.headline}</h1>
        <p data-editable-id="subheadline" style="font-size: 1.5rem; color: var(--text-color); margin: 1rem 0 2rem 0;">${content.subheadline}</p>
        <a href="#" class="btn">${content.cta}</a>
      </div>
       <footer style="text-align: center; padding: 2rem; background-color: var(--accent-color-1); color: var(--text-color);">
        <p data-editable-id="footer_text">${content.footer_text}</p>
      </footer>
    `,
    css: (theme) => commonCSS(theme),
  }
];
