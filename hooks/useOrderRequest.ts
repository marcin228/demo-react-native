import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useOrderRequest = () => {
  const [loading, setLoading] = useState(false);

  const submitOrder = useCallback(async (date: string) => {
    try {
      setLoading(true);
      const response = await fetch("https://example.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });

      if (!response.ok) throw new Error("Request failed");
    } catch (error) {
        Alert.alert('Wystąpił błąd podczas komunikacji z serwerem: ' + error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { submitOrder, loading };
};
