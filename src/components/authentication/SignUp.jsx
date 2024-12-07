import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const SignUp = () => {
  const { user } = useUser();

  const handleSignUp = async () => {
    if (user) {
      const userData = {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
      };

      await axios.post("http://localhost:3000/api/register", userData);
    }
  };

  return (
    <div>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};
export default SignUp;
