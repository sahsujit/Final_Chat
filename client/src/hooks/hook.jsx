import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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




export{useErrors, useAsyncMutation, useSocketEvents}








// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// // ✅ useErrors Hook
// const useErrors = (errors = []) => {
//   useEffect(() => {
//     if (!Array.isArray(errors)) return;

//     errors.forEach(({ isError, error, fallback }) => {
//       if (isError) {
//         if (fallback) fallback();
//         else toast.error(error?.data?.message || "Something went wrong");
//       }
//     });
//   }, [JSON.stringify(errors)]); // Ensures reactivity on value change
// };

// // ✅ useAsyncMutation Hook
// const useAsyncMutation = (mutationHook) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState(null);

//   const [mutate] = mutationHook();

//   const executeMutation = async ({ message = "Updating data...", args = [] } = {}) => {
//     setIsLoading(true);
//     const toastId = toast.loading(message);

//     try {
//       const res = await mutate(...args);

//       if (res.data) {
//         toast.success(res.data.message || "Updated successfully", { id: toastId });
//         setData(res.data);
//       } else {
//         toast.error(res?.error?.data?.message || "Something went wrong", { id: toastId });
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong", { id: toastId });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return [executeMutation, isLoading, data];
// };

// // ✅ useSocketEvents Hook
// const useSocketEvents = (socket, handlers) => {
//   useEffect(() => {
//     Object.entries(handlers).forEach(([event, callback]) => {
//       socket.on(event, callback);
//     });

//     return () => {
//       Object.entries(handlers).forEach(([event, callback]) => {
//         socket.off(event, callback);
//       });
//     };
//   }, [socket, handlers]);
// };

// export { useErrors, useAsyncMutation, useSocketEvents };
