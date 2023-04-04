import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
      </div>

      <LoginForm />
    </div>
  )
}

export default LoginPage
