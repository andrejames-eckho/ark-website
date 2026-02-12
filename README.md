# ARK Pro Audio Equipment Management System

A modern web application for managing professional audio equipment inventory, built with React, TypeScript, and Supabase.

**🚀 Live Demo**: [View Deployed Application](https://your-vercel-app-url.vercel.app)

## Features

- **Equipment Management**: Browse, search, and manage audio equipment inventory with advanced filtering
- **Admin Dashboard**: Secure admin interface for equipment management with role-based access control
- **Quote System**: Generate equipment quotes with dynamic pricing and email notifications
- **Service Pages**: Comprehensive service offerings including Full Production, Dry Hire, Installation, and Broadcast LED
- **Responsive Design**: Mobile-first design with modern UI and smooth animations
- **Real-time Updates**: Live inventory status and availability
- **Image Support**: Equipment photos and documentation storage with optimized loading
- **Modern Modal System**: Reusable modal components with accessibility features
- **Search & Filter**: Advanced equipment search with category and specification filtering

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI**: Custom CSS with CSS variables, Lucide React icons
- **Routing**: React Router DOM v7
- **Authentication**: Supabase Auth with role-based access control
- **Deployment**: Vercel with automatic deployments from Git

## Application Structure

### Public Pages
- **Home** (`/`): Landing page with company overview and call-to-action
- **About** (`/about`): Company information and team details
- **Equipment** (`/equipment`): Browse and search equipment inventory with detailed modal views
- **Services** (`/services`): Overview of all service offerings
  - Full Production (`/services/full-production`)
  - Dry Hire (`/services/dry-hire`) 
  - Installation (`/services/installation`)
  - Broadcast LED (`/services/broadcast-led`)

### Admin Panel
- **Admin Login** (`/backstage-access/login`): Secure authentication for administrators
- **Dashboard** (`/backstage-access`): Admin overview and statistics
- **Equipment Management** (`/backstage-access/equipment`): Full CRUD operations for equipment inventory

### Key Features
- **Quote System**: Modal-based quote form with equipment selection and validation
- **Equipment Search**: Real-time search with category filtering and specification matching
- **Image Management**: Optimized image storage and display with Supabase Storage
- **Role-Based Access**: Secure admin system with database-level permissions
- **Responsive Design**: Mobile-optimized with touch interactions and smooth animations

## Deployment

### Vercel Deployment

The application is configured for automatic deployment on Vercel:

1. **Connect Repository**: Link your Git repository to Vercel
2. **Environment Variables**: Set the following in Vercel dashboard:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. **Build Settings**: Vercel automatically detects the Vite configuration
4. **Deploy**: Automatic deployment on push to main branch

The `vercel.json` configuration ensures proper routing for the single-page application.

### Local Development

Follow the setup instructions below to run the application locally.

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd ark-website
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Set up Supabase**
   - Follow the detailed setup guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Create required tables and storage buckets
   - Configure authentication settings

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Main site: `http://localhost:5173`
   - Admin login: `http://localhost:5173/admin`

## Admin Management

### Adding New Admins

The ARK website uses a secure admin role system with database-level access control. Admin status is stored in a secure `admin_roles` table and enforced through Row Level Security policies.

#### Method 1: Database SQL (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** → **New query**
3. Run the following SQL to grant admin access:
   ```sql
   -- Grant admin role to a user (replace with actual user ID)
   SELECT grant_admin_role(
     'user-uuid-here', -- Target user's UUID
     'admin-uuid-here'  -- Your admin user UUID (granting user)
   );
   ```
4. To find user UUIDs, you can query:
   ```sql
   SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC;
   ```

#### Method 2: Direct Table Access

For existing admins, you can directly insert into the admin_roles table:
```sql
INSERT INTO admin_roles (user_id, created_by)
VALUES ('user-uuid-here', 'admin-uuid-here');
```

#### Method 3: Migration from Legacy System

If you have existing admins with user_metadata.role = 'admin', the security migration will automatically move them to the new secure system.

### Admin Access

- **Login URL**: `/admin`
- **Dashboard URL**: `/backstage-access`
- **Required**: Valid admin role in secure admin_roles table

### Security Considerations

- Only existing admins should assign new admin roles
- Admin role changes should be logged and monitored
- Consider implementing 2FA for admin accounts
- Regular admin role audits recommended
- Use strong passwords for admin accounts

### Troubleshooting

**Admin login not working:**
1. Verify user exists in Supabase Authentication
2. Check user has entry in admin_roles table
3. Ensure user has confirmed their email
4. Check browser console for authentication errors

**Access denied to admin dashboard:**
1. Verify `isAdmin` state in AuthContext
2. Check admin_roles table for user entry
3. Ensure proper redirect from `/admin` to `/backstage-access`

**Security Migration Issues:**
1. Run the security migration SQL if upgrading from legacy system
2. Verify existing admins were migrated to admin_roles table
3. Check that old user_metadata admin references are removed

## Project Structure

```
ark-website/
├── public/                 # Static assets (images, videos, icons)
├── src/
│   ├── components/
│   │   ├── admin/         # Admin-specific components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── EquipmentForm.tsx
│   │   │   └── EquipmentManager.tsx
│   │   ├── ui/            # Reusable UI components
│   │   │   ├── Modal.tsx  # Modern modal component
│   │   │   └── Modal.module.css
│   │   ├── EquipmentSelector.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── QuoteForm.tsx
│   │   └── ScrollToTop.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx    # Authentication state management
│   ├── lib/
│   │   └── supabase.ts        # Supabase client configuration
│   ├── pages/
│   │   ├── admin/             # Admin pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── EquipmentManagement.tsx
│   │   │   └── Login.tsx
│   │   ├── services/          # Service detail pages
│   │   │   ├── FullProduction.tsx
│   │   │   ├── DryHire.tsx
│   │   │   ├── Installation.tsx
│   │   │   └── BroadcastLED.tsx
│   │   ├── About.tsx
│   │   ├── ContentUnavailable.tsx
│   │   ├── Equipment.tsx      # Equipment browsing with search
│   │   ├── Home.tsx
│   │   └── Services.tsx
│   ├── App.tsx               # Main application with routing
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and CSS variables
├── supabase/
│   └── migrations/           # Database schema and migrations
├── .env.example              # Environment variables template
├── package.json              # Dependencies and scripts
├── vercel.json               # Vercel deployment configuration
├── vite.config.ts            # Vite build configuration
└── README.md                 # This file
```

## Development

### Available Scripts

- `npm run dev` - Start development server on http://localhost:5173
- `npm run build` - Build for production (optimized for Vercel deployment)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note**: All environment variables must be prefixed with `VITE_` to be accessible in the Vite build process.

### Development Workflow

1. **Local Development**: Use `npm run dev` for hot-reloading development server
2. **Code Quality**: Run `npm run lint` before committing changes
3. **Testing**: Build locally with `npm run build` to verify production readiness
4. **Deployment**: Push to main branch for automatic Vercel deployment

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## Authentication Flow

1. **User Registration**: Email/password signup via Supabase Auth
2. **Role Assignment**: Admin role assigned via secure admin_roles table
3. **Login**: Standard Supabase authentication
4. **Access Control**: Database-level security with RLS policies
5. **Session Management**: Persistent auth state via Supabase client
6. **Security**: Admin status verified against secure database table

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the existing code style
4. Run `npm run lint` to ensure code quality
5. Test your changes locally with `npm run dev`
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Performance & Optimization

### Build Optimizations
- **Code Splitting**: Automatic route-based code splitting with React Router
- **Asset Optimization**: Images and assets optimized during Vite build
- **Tree Shaking**: Unused code eliminated in production builds
- **CSS Purging**: Only used CSS styles included in production

### Deployment Performance
- **CDN Delivery**: Vercel's global CDN for fast content delivery
- **Automatic HTTPS**: SSL certificates managed automatically
- **Edge Caching**: Static assets cached at edge locations
- **Build Caching**: Incremental builds for faster deployments

## Support & Troubleshooting

### Common Issues

**Build fails on Vercel:**
1. Check environment variables in Vercel dashboard
2. Verify all dependencies are properly installed
3. Review build logs for specific error messages

**Images not loading:**
1. Verify Supabase storage bucket permissions
2. Check image URLs and CORS settings
3. Ensure proper authentication for private images

**Admin access denied:**
1. Verify user exists in `admin_roles` table
2. Check Supabase RLS policies
3. Ensure proper authentication flow

### Resources

- **Supabase Documentation**: [https://supabase.com/docs](https://supabase.com/docs)
- **Vercel Documentation**: [https://vercel.com/docs](https://vercel.com/docs)
- **React Router v7**: [https://reactrouter.com](https://reactrouter.com)
- **Vite Guide**: [https://vitejs.dev/guide](https://vitejs.dev/guide)

For issues related to:
- **Supabase Setup**: See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Admin Access**: Check the Admin Management section above
- **Deployment**: Review Vercel configuration and environment variables
- **Development**: Check the project structure and setup instructions

---

**ARK Pro Audio Equipment Management System** - Built with ❤️ for audio professionals
