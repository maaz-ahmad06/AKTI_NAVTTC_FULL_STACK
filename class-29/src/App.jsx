import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Ye state submitted data ko store karegi
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data); // jo data form se aya, wo state me daal do
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email field */}
        <input
          {...register("email", { required: "Email zaroori hai" })}
          placeholder="Email"
        /> <br /> <br />
        {errors.email && <p>{errors.email.message}</p>}

        {/* Password field */}
        <input
          type="password"
          {...register("password", {
            required: "Password zaroori hai",
            minLength: { value: 6, message: "Kam se kam 6 characters" },
          })}
          placeholder="Password"
        /> <br /> <br />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>

      {/* Yahan submitted data show hoga */}
      {submittedData && (
        <div style={{ marginTop: "20px", border: "1px solid gray", padding: "10px" }}>
          <h3>Submitted Data:</h3>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}

export default App;