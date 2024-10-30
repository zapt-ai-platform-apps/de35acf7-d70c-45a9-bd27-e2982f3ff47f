# New App

## Description

New App is a professional AI-powered website builder that leverages artificial intelligence to help users create stunning websites effortlessly. The app provides an intuitive interface where users can generate website templates, customize content, and preview their sites in real-time.

## User Journeys

### 1. Sign In with ZAPT

1. **Open the App**: Users navigate to the app's landing page.
2. **Sign In**: Click on the "Sign in with ZAPT" text above the authentication component.
3. **Authentication**: Users can authenticate via email magic link or social providers like Google, Facebook, or Apple.
4. **Access Granted**: Upon successful sign-in, users are taken to the main dashboard.

### 2. Generate a Website Template

1. **Dashboard View**: After signing in, users see the main dashboard with options to create a new website.
2. **Enter Prompt**: Users input a description of the website they want to create (e.g., "A modern portfolio site for a photographer").
3. **Generate Template**: Click on the "Generate Website" button to initiate the AI generation.
4. **Loading State**: The app displays a loading indicator while processing the request.
5. **View Results**: The generated website template appears in the preview area.

### 3. Customize Website Content

1. **Edit Sections**: Users can interact with different sections of the template (note: detailed customization is beyond current functionality).
2. **Real-Time Preview**: Any changes would be reflected in the preview area.
3. **Add Sections**: Users can conceptualize adding new sections (future feature).
4. **Undo Changes**: Ability to undo or redo recent changes (future feature).

### 4. Export Website

1. **Finalize Design**: Once satisfied with the generated template, users can view the HTML and CSS code.
2. **Copy Code**: Users can copy the generated code for personal use or deployment.

### 5. Sign Out

1. **Access Menu**: Click on the "Sign Out" button in the top-right corner.
2. **Sign Out**: The app signs the user out and returns to the sign-in page.

## External APIs Used

- **OpenAI API**: Generates website templates based on user prompts.

*Note: API keys for external services should be added to the `.env` file as environment variables.*

## Environment Variables

- `VITE_PUBLIC_APP_ID`: Your app's public ID.
- `VITE_PUBLIC_SENTRY_DSN`: Sentry Data Source Name for error logging.
- `VITE_PUBLIC_APP_ENV`: The current environment (e.g., development, production).
- `OPENAI_API_KEY`: API key for accessing the OpenAI services.

## Requirements

- Ensure you have all environment variables set in your hosting platform.
- The app is responsive and user-friendly on all screen sizes.
- Loading states are displayed during all API calls to provide feedback to the user.
