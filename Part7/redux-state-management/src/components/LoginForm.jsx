import useField from '../hooks';

const LoginForm = ({ login }) => {
  const nameFiled = useField('text')
  const pwdField = useField('password')

  const handleLogin = (event) => {
    event.preventDefault();
    login(nameFiled.value, pwdField.value);
    nameFiled.reset();
    pwdField.reset();
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid='username'
          name="Username"
          type={nameFiled.type}
          value={nameFiled.value}
          onChange={nameFiled.onChange}/>
      </div>
      <div>
        password
        <input
          data-testid='password'
          name="Password"
          type={pwdField.type}
          value={pwdField.value}
          onChange={pwdField.onChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
