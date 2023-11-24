
const FeedbackForm = ({ email }) => {
  // Function to show  message as a toast
  const showfeedBackToast = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // Dispatch the addReview action with the form data and headers
    console.log(data);
    dispatch(submitFeedback(email, data.feedbackText)).then((response) => {
      if (response) {
        showfeedBackToast("Review Submitted Successfully");
      } else {
        showfeedBackToast("Some error occurred, Please Try again later");
      }
    });
  };
  return (
    <div>
      <div className="md:flex md:justify-between md:items-center my-5 ">
        <div className="p-5 bg-themeColor text-white w-full rounded-lg ">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <div className="text-lg md:text-xl lg:text-2xl font-medium">
                {" "}
                Overall Experience{" "}
              </div>
              <div className="text-base font-light text-white">
                How would you rate your overall Experience with this Employee
              </div>
            </div>
            {/* stars  */}

            <div class="flex items-center my-4 md:my-0  ">
              <FiStar className="text-yellow-300 text-xl mx-2 cursor-pointer" />
              <FiStar className="text-yellow-300 text-xl mx-2 cursor-pointer" />
              <FiStar className="text-yellow-300 text-xl mx-2 cursor-pointer" />
              <FiStar className="text-yellow-300 text-xl mx-2 cursor-pointer" />
              <FiStar className="text-yellow-300 text-xl mx-2 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <form className="mx-2  w-full " onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            for="feedbackText"
            className="block mb-2 text-sm font-medium text-textColor "
          >
            Give your feedback (public)
          </label>
          <textarea
            rows={9}
            id="feedbackText"
            className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
            {...register("feedbackText")}
          />
        </div>

        
      </form>
      <ToastContainer />
    </div>
  );
};

export default FeedbackForm;
