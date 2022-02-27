# Next.js + Next SEO

## Provider Configuration

### GitHub

1. GitHub Account -> Settings
2. Developer settings
3. Oauth Apps -> Register a new application
   - Application name: My Local App
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth`
   - Click in Register application
4. Client secrets -> Generate a new client secret

### Facebook

1. Meta for Developers -> [My Apps](https://developers.facebook.com/apps/)
2. Create App
3. Select an app type -> Consumer -> Next
4. Provide basic information
   - Display name: My Local App
   - Click in Create App
5. Facebook Login -> Set up
6. Select Web
   - Site URL: `http://localhost:3000`
   - Click in Next in follow steps
7. Settings -> Basic
