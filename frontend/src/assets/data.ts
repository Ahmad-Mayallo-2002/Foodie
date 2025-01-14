import { IconType } from "react-icons";
import {
  FaUsers,
  FaRegStickyNote,
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaHeart,
  FaProductHunt,
  FaFirstOrder,
} from "react-icons/fa";
import { LiaFirstOrder } from "react-icons/lia";
import { FaCartShopping } from "react-icons/fa6";
import { MdDashboard, MdAddShoppingCart } from "react-icons/md";
import Cookies from "universal-cookie";

type ListLink = {
  name: string;
  path: string;
};

const ListLinks: ListLink[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/About",
  },
  {
    name: "Contact",
    path: "/Contact",
  },
  {
    name: "Products",
    path: "/Products",
  },
];

type Featured = {
  title: string;
  desc: string;
  image: string;
};

const Featureds: Featured[] = [
  {
    title: "Le Petit Chef",
    desc: "A quaint bistro offering a fusion of French and Italian cuisine.",
    image: "feat-1.jpg",
  },
  {
    title: "Skyline Eats",
    desc: "Experience Asian fusion dishes in a chic rooftop setting.",
    image: "feat-2.jpg",
  },
  {
    title: "Harvest Table",
    desc: "Farm-to-table dining experience with locally sourced ingredients.",
    image: "feat-3.jpg",
  },
  {
    title: "Sushi Haven",
    desc: "Authentic sushi and sashimi crafted by expert Japanese chefs.",
    image: "feat-4.jpg",
  },
];

type Feature = {
  title: string;
  desc: string;
  icon: IconType;
  bg: string;
  color: string;
  category: string;
};

const Features: Feature[] = [
  {
    title: "Appetizers",
    desc: "Explore our variety of appetizers to kickstart your meal, from bruschetta to spring rolls.",
    category: "Starters",
    icon: FaRegStickyNote,
    bg: "#F1F8FDFF",
    color: "#379AE6FF",
  },
  {
    title: "Main Courses",
    desc: "Dive into our selection of hearty main courses, including pasta, steaks, and vegetarian options.",
    category: "Entrees",
    icon: MdDashboard,
    color: "#117B34FF",
    bg: "#EEFDF3FF",
  },
  {
    title: "Deserts",
    desc: "Indulge in our delicious desserts, featuring cakes, pastries, and ice creams.",
    category: "Sweets",
    icon: FaUsers,
    color: "#46CDE6FF",
    bg: "#FDF2F2FF",
  },
];

type link = {
  icon: IconType;
  color: string;
  path: string;
};

const links: link[] = [
  {
    icon: FaFacebook,
    color: "#4267B2", // Facebook Blue
    path: "https://www.facebook.com/",
  },
  {
    icon: FaLinkedin,
    color: "#0077B5", // LinkedIn Blue
    path: "https://www.linkedin.com/in/ahmad-mayallo-86944b21b/",
  },
  {
    icon: FaGithub,
    color: "#fff", // GitHub Black
    path: "https://github.com/Ahmad-Mayallo-2002/",
  },
  {
    icon: FaTwitter,
    color: "#1DA1F2", // Twitter Blue
    path: "https://www.twitter.com/",
  },
  {
    icon: FaYoutube,
    color: "#FF0000", // YouTube Red
    path: "https://www.youtube.com/",
  },
];

type category = {
  title: string;
  image: string;
};

const categories: category[] = [
  {
    title: "Burger",
    image:
      "https://img.freepik.com/premium-photo/taste-sensation-fast-food-frenzy_960396-188041.jpg",
  },
  {
    title: "Pizza",
    image:
      "https://www.eatingwell.com/thmb/k3RhYf4XhAeqAejYjdInOlSOp6I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-1124303516-36413b5bf61f45f1b7d18d90000b56b7.jpg",
  },
  {
    title: "Sushi",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/800px-Sushi_platter.jpg",
  },
  {
    title: "Taco",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/NCI_Visuals_Food_Taco.jpg/1200px-NCI_Visuals_Food_Taco.jpg",
  },
  {
    title: "Burrito",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Burrito.JPG/800px-Burrito.JPG",
  },
  {
    title: "Fried Chicken",
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/2/23/FNK_Indian-Fried-Chicken_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1677264108617.webp",
  },
];

const categoriesList: string[] = [
  "all",
  "asian food",
  "seafood",
  "burger",
  "pizza",
  "chines food",
  "sushi",
  "taco",
  "burrito",
  "salad",
];

type ProfileLink = {
  Icon: IconType;
  title: string;
  path: string;
};

const ProfileLinks: ProfileLink[] = [
  {
    Icon: FaHeart,
    title: "Favorites",
    path: "/Profile/Favorites",
  },
  {
    Icon: FaCartShopping,
    title: "My Cart",
    path: "/Profile/Cart",
  },
  {
    Icon: LiaFirstOrder,
    title: "My Orders",
    path: "/Profile/Order",
  },
];

const AdminProfileLinks: ProfileLink[] = [
  {
    Icon: FaUsers,
    title: "All Users",
    path: "/Profile/AllUsers",
  },
  {
    Icon: FaFirstOrder,
    title: "All Orders",
    path: "/Profile/AllOrders",
  },
  {
    Icon: MdAddShoppingCart,
    title: "All Products",
    path: "/Profile/AllProducts",
  },
  {
    Icon: FaProductHunt,
    title: "Add Product",
    path: "/Profile/AddProduct",
  },
];

const mainUrl: string = "https://foodie-api-roan.vercel.app/api/";

export type MyProduct = {
  _id?: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
};

type Token = {
  token: string;
  _id: string;
  role: string;
};

const getToken = (): Token => {
  const cookies = new Cookies();
  const token: Token = cookies.get("token");
  return token || { token: "", _id: "", role: "" };
};

export {
  ListLinks,
  mainUrl,
  ProfileLinks,
  Featureds,
  Features,
  links,
  categories,
  categoriesList,
  AdminProfileLinks,
  getToken,
};
