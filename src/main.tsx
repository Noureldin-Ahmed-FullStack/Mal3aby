// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/fonts.css'
import './styles/Post.css'
import './styles/ExtraComponents.css'
import './styles/navbar.css'
import { ToastContainer } from 'react-toastify';
import "yet-another-react-lightbox/styles.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage.tsx'
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react'
import CenteredPage from './components/CenteredPage.tsx'
import NotFoundPage from './components/NotFoundPage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SocialPage from './components/Pages/SocialPage.tsx'
import 'react-toastify/dist/ReactToastify.css';
import Managment from './components/Pages/Managment.tsx'
import ProfilePage from './components/Pages/ProfilePage.tsx'
import FieldsPage from './components/FieldsPage.tsx'
import Favouritespage from './components/Pages/Favouritespage.tsx'
import FieldDetailsPage from './components/Pages/FieldDetailsPage.tsx'
import PaymentPage from './components/Pages/PaymentPage.tsx'
import TicketPage from './components/Pages/TicketPage.tsx'
import BookingsParent from './components/Pages/BookingsParent.tsx'
import LoginFirstPage from './components/Pages/LoginFirstPage.tsx'
import ManageAllUsersPage from './components/Pages/ManageAllUsersPage.tsx'
import NewsPage from './components/Pages/NewsPage.tsx'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/Mal3aby", element: <HomePage /> },
      { path: "/field/:fieldID", element: <FieldDetailsPage /> },
      { path: "/soccer", element: <FieldsPage /> },
      { path: "/ticket/:ticketID", element: <div className='mt-28'><TicketPage /></div> },
      { path: "/paddle", element: <FieldsPage /> },
      { path: "/manageAllUsers", element: <ManageAllUsersPage /> },
      { path: "/payment-response", element: <PaymentPage /> },
      { path: "/myBookings", element: <BookingsParent /> },
      { path: "/favourites", element: <Favouritespage className='my-28'/> },
      { path: "/pool-billiard", element: <FieldsPage /> },
      { path: "/swimming-pool", element: <FieldsPage /> },
      { path: "/news", element: <NewsPage /> },
      { path: "/Profile", element: <><SignedIn><ProfilePage /></SignedIn><SignedOut><LoginFirstPage /></SignedOut></>},
      { path: "/managment", element: <CenteredPage><Managment /></CenteredPage> },
      { path: "/Social", element: <SocialPage /> },
      { path: "/sign-in", element: <CenteredPage className="mt-20"><SignUp routing='hash' forceRedirectUrl={'/Mal3aby'} /></CenteredPage> },
      { path: "/sign-up", element: <CenteredPage className="mt-20"><SignIn routing='hash' forceRedirectUrl={'/Mal3aby'} /></CenteredPage> },
      { path: "*", element: <CenteredPage><NotFoundPage /></CenteredPage> },
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <App /> */}
      
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ClerkProvider>
  // </StrictMode>
)
