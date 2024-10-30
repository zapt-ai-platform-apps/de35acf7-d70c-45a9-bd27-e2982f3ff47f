# New App

## Description

New App is a professional website builder that leverages artificial intelligence to help users create stunning websites effortlessly. The app provides an intuitive interface where users can generate website templates, customize content, and preview their sites in real-time.

## User Journeys

### 1. Sign In with ZAPT

1. **Open the App**: Users navigate to the app's landing page.
2. **Sign In**: Click on the "Sign in with ZAPT" button.
3. **Authentication**: Users are redirected to authenticate via email magic link or social providers like Google, Facebook, or Apple.
4. **Access Granted**: Upon successful sign-in, users are taken to the main dashboard.

### 2. Generate a Website Template

1. **Dashboard View**: After signing in, users see the main dashboard with options to create a new website.
2. **Enter Prompt**: Users input a description of the website they want to create (e.g., "A modern portfolio site for a photographer").
3. **Generate Template**: Click on the "Generate Website" button to initiate the AI generation.
4. **Loading State**: The app displays a loading indicator while processing the request.
5. **View Results**: The generated website template appears in the preview area.

### 3. Customize Website Content

1. **Edit Sections**: Users can click on different sections of the template to edit text, images, and styles.
2. **Real-Time Preview**: Changes are reflected in real-time in the preview area.
3. **Add Sections**: Users can add new sections like galleries, contact forms, or testimonials.
4. **Undo Changes**: Ability to undo or redo recent changes.

### 4. Export Website

1. **Finalize Design**: Once satisfied with the customization, users click on the "Export" button.
2. **Choose Format**: Select the desired format for export (e.g., ZIP file, upload to hosting service).
3. **Download Files**: The website files are downloaded for personal use or deployment.

### 5. Sign Out

1. **Access Menu**: Click on the user profile icon in the top-right corner.
2. **Sign Out**: Select "Sign Out" from the dropdown menu.
3. **Confirmation**: The app signs the user out and returns to the sign-in page.

## External APIs Used

- **OpenAI API**: Generates website templates based on user prompts.
- **Unsplash API**: Fetches high-quality images for website content.

*Note: API keys for external services should be added to the `.env` file as environment variables.*

## Environment Variables

- `VITE_PUBLIC_APP_ID`: Your app's public ID.
- `VITE_PUBLIC_SENTRY_DSN`: Sentry Data Source Name for error logging.
- `VITE_PUBLIC_APP_ENV`: The current environment (e.g., development, production).
- `OPENAI_API_KEY`: API key for accessing the OpenAI services.
- `UNSPLASH_ACCESS_KEY`: Access key for the Unsplash API.
