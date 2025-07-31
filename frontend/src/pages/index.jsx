import CartPage from "./CartPage";
import CheckOutPage from "./CheckoutPage";
import SharedLayoutPage from "./SharedLayoutPage";
import LoginPage from "./LoginPage";
import OrderSuccessPage from "./OrderSuccessPage";
import PageNotFound from "./PageNotFound";
import ProductDetailPage from "./ProductDetailPage";
import ProductsPage from "./ProductsPage";
import SignUpPage from "./SignUpPage";
import UserOrdersPage from "./UserOrdersPage";
import OrderTrackingPage from '../pages/OrderTrackingPage'
import UserProfilePage from "./UserProfilePage";
import HomePage from "./HomePage";
import LogoutPage from "./LogoutPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import AdminHomePage from "./adminPages/AdminHomePage";
import AdminProductDetailPage from "./adminPages/AdminProductDetailPage";
import AdminOrdersPage from "./adminPages/AdminOrdersPage";
import AdminProductPage from "./adminPages/AdminProductPage";
import AdminProductFormPage from './adminPages/AdminProductFormPage'
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
    OrderTrackingPage,
  // ===================?
  // Product Pages =======>
    ProductDetailPage,
    ProductsPage,
  // =====================>

  // Profile Page =======> 
    UserProfilePage,
  // ====================> 
  
  // Common Pages ==========>
  SharedLayoutPage,
  HomePage,
  // ======================>

  // Admin Pages =======>
  AdminHomePage,
  AdminProductPage,
  AdminProductDetailPage,
  AdminOrdersPage,
  AdminProductFormPage,
  // ==================>

  // Error Page ==========>
  PageNotFound,
  // =====================>
};