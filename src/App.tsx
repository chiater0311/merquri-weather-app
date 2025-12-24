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
        flex items-center justify-center
        px-4
      "
    >
      <WeatherSearchForm />
    </div>
  );
};

export default App;
