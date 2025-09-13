import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../src/components/ui/toaster";
import { TooltipProvider } from "../src/components/ui/tooltip";
import Layout from "../src/components/Layout";
import Home from "../src/pages/Home";
import WhyUs from "../src/pages/WhyUs";
import Insights from "../src/pages/Insights";
import Tools from "../src/pages/Tools";
import Services from "../src/pages/Services";
import Contact from "../src/pages/Contact";
import Login from "../src/pages/admin-login";
import About from "../src/pages/about";
import Calculator from "../src/pages/Calculator";
import Dashboard from "../src/pages/admin-dashboard";
import NotFound from "../src/pages/not-found";
import Enquiry from "../src/pages/enquiry";
import BlogDetail from "../src/pages/blog-detail";
import AllBlogs from "../src/pages/all-blogs";
import AllVideos from "../src/pages/all-videos";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  return (
    <Layout>
     <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/why-36x" component={WhyUs} />
        <Route path="/insights" component={Insights} />
        <Route path="/tools" component={Tools} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/admin-dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/enquiry" component={Enquiry} />
        <Route path="/blogs" component={AllBlogs} />
        <Route path="/blogs/:id" component={BlogDetail} />
        <Route path="/videos" component={AllVideos} />

        {/* Resource routes */}
        <Route path="/resources" component={Insights} />
        <Route path="/resources/calculator" component={Calculator} />
        <Route path="/resources/why-36x" component={WhyUs} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
