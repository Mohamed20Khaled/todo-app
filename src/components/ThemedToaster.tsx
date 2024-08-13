import { Toaster } from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";

const ThemedToaster = () => {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 5000,
        style: {
          background: theme === "dark" ? "#1F2937" : "#FFFFFF",
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
          border: `1px solid ${theme === "dark" ? "#374151" : "#E5E7EB"}`,
        },
      }}
    />
  );
};

export default ThemedToaster;
