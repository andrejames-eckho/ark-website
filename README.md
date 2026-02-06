# ARK Pro Audio Equipment Management System

A modern web application for managing professional audio equipment inventory, built with React, TypeScript, and Supabase.

## Features

- **Equipment Management**: Browse, search, and manage audio equipment inventory
- **Admin Dashboard**: Secure admin interface for equipment management
- **Quote System**: Generate equipment quotes with dynamic pricing
- **Responsive Design**: Mobile-first design with modern UI
- **Real-time Updates**: Live inventory status and availability
- **Image Support**: Equipment photos and documentation storage

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI**: Custom CSS with CSS variables, Lucide React icons
- **Routing**: React Router DOM v7
- **Authentication**: Supabase Auth with role-based access control

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

The ARK website uses Supabase Authentication with role-based access control. Admin status is determined by `user.user_metadata.role === 'admin'`.

#### Method 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Find the existing user or click **Add user** to create a new one
4. Edit the user's `user_metadata` field to include:
   ```json
   {"role": "admin"}
   ```
5. The user can now login with their email/password at `/admin`

#### Method 2: Direct Database Access

Access Supabase SQL Editor and run:
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(raw_user_meta_data, '{role}', '"admin"') 
WHERE email = 'user@example.com';
```

### Admin Access

- **Login URL**: `/admin`
- **Dashboard URL**: `/backstage-access`
- **Required**: Valid admin role in user metadata

### Security Considerations

- Only existing admins should assign new admin roles
- Admin role changes should be logged and monitored
- Consider implementing 2FA for admin accounts
- Regular admin role audits recommended
- Use strong passwords for admin accounts

### Troubleshooting

**Admin login not working:**
1. Verify user exists in Supabase Authentication
2. Check `user_metadata.role` equals `"admin"`
3. Ensure user has confirmed their email
4. Check browser console for authentication errors

**Access denied to admin dashboard:**
1. Verify `isAdmin` state in AuthContext
2. Check user metadata structure
3. Ensure proper redirect from `/admin` to `/backstage-access`

## Project Structure

```
src/
├── components/
│   ├── admin/          # Admin-specific components
│   ├── common/         # Shared components
│   └── ui/             # UI components
├── contexts/           # React contexts (Auth, etc.)
├── lib/               # Utilities and configurations
├── pages/             # Page components
│   └── admin/         # Admin pages
└── styles/            # CSS and styling
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Authentication Flow

1. **User Registration**: Email/password signup via Supabase Auth
2. **Role Assignment**: Admin role set in user metadata
3. **Login**: Standard Supabase authentication
4. **Access Control**: Role-based routing and component protection
5. **Session Management**: Persistent auth state via Supabase client

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues related to:
- **Supabase Setup**: See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Admin Access**: Check the Admin Management section above
- **Development**: Review the project structure and environment setup

---

**ARK Pro Audio Equipment Management System** - Built with ❤️ for audio professionals
