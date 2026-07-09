import { Switch, Route, Router } from "wouter";
import Landing from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Support from "@/pages/support";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";

// Strip the trailing slash from Vite's BASE_URL ("/tonechromawebsite/" -> "/tonechromawebsite")
// so wouter's base path matching lines up with how routes are declared below.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/support" component={Support} />
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
