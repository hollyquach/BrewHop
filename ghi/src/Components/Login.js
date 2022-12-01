import { useToken } from "./useToken";

function Login() {
  const [, login] = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    login("test@test.com", "test");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>sign in!</label>
      </div>
      <div>
        <div>
          <button>Submit</button>
        </div>
      </div>
    </form>
  );
}

export default Login;
