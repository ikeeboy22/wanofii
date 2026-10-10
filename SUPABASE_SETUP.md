# Connect the admin panel to shared storage

The admin page used to save changes in one browser's local storage. This version stores the editable homepage content in Supabase so the public website and admin panel use the same saved record.

## 1. Create the content table

In the Supabase project, open **SQL Editor** and run:

```sql
create table if not exists public.wanofii_content (
  id integer primary key check (id = 1),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.wanofii_content enable row level security;
revoke all on table public.wanofii_content from anon, authenticated;
grant select, insert, update on table public.wanofii_content to service_role;
```

Only the server-side app uses the table. The secret key must stay in server environment settings; it is never sent to the browser.

## 2. Add Vercel environment variables

In the Wanofii project on Vercel, open **Settings → Environment Variables** and add these values for Production (and Preview if you use preview deployments):

| Name | Value |
| --- | --- |
| `SUPABASE_URL` | The project's Supabase URL, such as `https://your-project.supabase.co` |
| `SUPABASE_SECRET_KEY` | A Supabase secret API key from **Settings → API Keys** |
| `WANOFII_ADMIN_PASSWORD` | A new, strong password for `/admin` |
| `WANOFII_SESSION_SECRET` | A long random secret used to sign admin sessions |

If your project only has the older `service_role` key, `SUPABASE_SERVICE_ROLE_KEY` is also supported. Keep either database key server-side; do not add a `NEXT_PUBLIC_` prefix.

After saving the variables, redeploy the site. Then sign in at `/admin`. Edits to the homepage headline, contact number, and service names, descriptions, prices, and pictures will save to the shared database and appear on the public site.
