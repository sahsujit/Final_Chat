import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};


const useAsyncMutation = (mutatationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutatationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating data...");

    try {
      const res = await mutate(...args);

      if (res.data) {
        toast.success(res.data.message || "Updated data successfully", {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return [executeMutation, isLoading, data];
};



const useSocketEvents = (socket, handler) =>{
  useEffect(()=>{
    Object.entries(handler).forEach(([event, handler])=>{
    socket.on(event, handler)
  })
  return ()=>{
    Object.entries(handler).forEach(([event, handler])=>{
      socket.off(event, handler)
    })
  }
  },[socket, handler])
}



const useFetchData = (url, key = "") => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(url, {
          withCredentials: true, // important if backend uses cookies
        });
        if (isMounted) {
          setData(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          console.error("Fetch error:", err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, key]);

  return { data, loading, error };
};





export{useErrors, useAsyncMutation, useSocketEvents, useFetchData}





