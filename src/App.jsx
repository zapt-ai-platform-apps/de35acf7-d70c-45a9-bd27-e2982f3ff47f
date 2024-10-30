import { createSignal, onMount, createEffect, Show } from "solid-js";
import { createEvent, supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-solid";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal("login");
  const [loading, setLoading] = createSignal(false);
  const [prompt, setPrompt] = createSignal("");
  const [generatedCode, setGeneratedCode] = createSignal("");

  const checkUserSignedIn = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage("homePage");
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage("homePage");
      } else {
        setUser(null);
        setCurrentPage("login");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage("login");
  };

  const handleGenerateWebsite = async () => {
    if (!prompt()) return;
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const response = await fetch("/api/generateWebsite", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt() }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedCode(data.code);
      } else {
        console.error("Error generating website");
      }
    } catch (error) {
      console.error("Error generating website:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <Show
        when={currentPage() === "homePage"}
        fallback={
          <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">
                Sign in with ZAPT
              </h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                Learn more about ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={["google", "facebook", "apple"]}
                magicLink={true}
                showLinks={false}
                authView="magic_link"
              />
            </div>
          </div>
        }
      >
        <div class="max-w-6xl mx-auto h-full flex flex-col">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-purple-600">AI Website Builder</h1>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>

          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-2xl font-bold mb-4 text-purple-600">
                Describe Your Website
              </h2>
              <textarea
                rows="6"
                placeholder="e.g., A modern portfolio site for a photographer"
                value={prompt()}
                onInput={(e) => setPrompt(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
              ></textarea>
              <button
                onClick={handleGenerateWebsite}
                class={`mt-4 w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                  loading() ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading()}
              >
                <Show when={loading()} fallback="Generate Website">
                  Generating...
                </Show>
              </button>
            </div>

            <div>
              <h2 class="text-2xl font-bold mb-4 text-purple-600">
                Preview Generated Website
              </h2>
              <div class="border p-4 rounded-lg h-full overflow-auto bg-white">
                <Show when={generatedCode()} fallback={<p>No code generated yet.</p>}>
                  <iframe
                    srcDoc={generatedCode()}
                    title="Generated Website"
                    class="w-full h-full border-none"
                  ></iframe>
                </Show>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <Show when={generatedCode()}>
              <h2 class="text-2xl font-bold mb-4 text-purple-600">Generated Code</h2>
              <pre class="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                {generatedCode()}
              </pre>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;