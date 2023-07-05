import Image from 'next/image'

export default function SignIn() {
  return (
    <main className="h-screen flex p-5">
      <div className="flex w-full">
        <Image
          src="/assets/sign-in-cover.svg"
          alt=""
          width={598}
          height={912}
          quality={100}
          className="my-auto hidden h-full max-h-[912px] w-auto animate-in fade-in duration-500 lg:block"
        />

        <aside className="flex flex-col justify-center items-center w-full">
          <div className="w-full max-w-[372px] animate-in fade-in slide-in-from-right duration-500">
            <h1 className="text-gray-100 text-2xl font-bold">Boas vindas!</h1>
            <p className="text-gray-200 text-base">
              Faça seu login ou acesse como visitante.
            </p>

            <div className="mt-10 w-full space-y-4">
              <button className="h-18 rounded-lg w-full flex items-center bg-gray-600 px-6 py-5 gap-5 cursor-pointer hover:bg-gray-500 transition-all">
                <Image
                  src="/assets/google-icon.svg"
                  alt=""
                  width={32}
                  height={32}
                  quality={100}
                />
                <p className="text-gray-200 font-bold text-">Entrar com Google</p>
              </button>
              <button className="h-18 rounded-lg w-full flex items-center bg-gray-600 px-6 py-5 gap-5 cursor-pointer hover:bg-gray-500 transition-all">
                <Image
                  src="/assets/github-icon.svg"
                  alt=""
                  width={32}
                  height={32}
                  quality={100}
                />
                <p className="text-gray-200 font-bold text-">Entrar com Github</p>
              </button>
              <button className="h-18 rounded-lg w-full flex items-center bg-gray-600 px-6 py-5 gap-5 cursor-pointer hover:bg-gray-500 transition-all">
                <Image
                  src="/assets/rocket-icon.svg"
                  alt=""
                  width={32}
                  height={32}
                  quality={100}
                />
                <p className="text-gray-200 font-bold text-">Acessar como visitante</p>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
