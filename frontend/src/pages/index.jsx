import CartPage from "./CartPage";
import CheckOutPage from "./CheckoutPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import OrderSuccessPage from "./OrderSuccessPage";
import PageNotFound from "./PageNotFound";
import ProductDetailPage from "./ProductDetailPage";
import ProductsPage from "./ProductsPage";
import SignUpPage from "./SignUpPage";
import UserOrdersPage from "./UserOrdersPage";
import UserProfilePage from "./UserProfilePage";
import LandingPage from "./LandingPage";
import LogoutPage from "./LogoutPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import AdminHomePage from "./adminPages/AdminHomePage";
import AdminProductDetailPage from "./adminPages/AdminProductDetailPage";
export {
  // Auth Pages ==========>
    LoginPage,
    SignUpPage,
    LogoutPage,
    ForgotPasswordPage,
  // =====================>

  // Cart Pages ==========>
    CartPage,
  // =====================>

  // Checkout Pages ======>
    CheckOutPage,
  // =====================>
  // Order Page===========>
    OrderSuccessPage,
    UserOrdersPage,
  // ===================?
  // Product Pages =======>
    ProductDetailPage,
    ProductsPage,
  // =====================>

  // Profile Page =======> 
    UserProfilePage,
  // ====================> 
  
  // Common Pages ==========>
  HomePage,
  LandingPage,
  // ======================>

  // Admin Pages =======>
  AdminHomePage,
  AdminProductDetailPage,
  // ==================>

  // Error Page ==========>
  PageNotFound,
  // =====================>
};