import ThemeToggle from "./components/ThemeToggle";
import WeatherSearchForm from "./components/WeatherSearchForm";

const App = () => {
  return (
    <div
      className="
        min-h-screen
        bg-cover bg-center bg-no-repeat
        bg-[url('/backgrounds/bg-light.png')]
        dark:bg-[url('/backgrounds/bg-dark.png')]
        transition-[background-image] duration-300
        flex flex-col items-center py-4
        px-4 gap-5
      "
    >
      <div className="block ml-auto lg:absolute lg:top-4 lg:right-4 ">
        <ThemeToggle />
      </div>
      <WeatherSearchForm />
    </div>
  );
};

export default App;
