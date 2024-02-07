import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import BookingDetail from "./features/bookings/BookingDetail";
import CheckBooking from "./pages/CheckBooking";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="account" element={<Account />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:bookingId" element={<BookingDetail />} />
            <Route
              path="bookings/check/:bookingId"
              element={<CheckBooking />}
            />
            <Route path="cabins" element={<Cabins />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "var(color-grey-200)",
            color: "var(--color-grey-900)",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
