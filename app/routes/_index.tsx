import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";
// import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [
  { title: "Hezino", description: "Hezino homepage" },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  await new Promise((res) => setTimeout(res, 1200));

  const formData = await request.formData();
  const email = formData.get("email");

  invariant(process.env.NEWSLETTER_API_URL, "NEWSLETTER_API_URL must be set");
  invariant(process.env.NEWSLETTER_API_KEY, "NEWSLETTER_API_KEY must be set");
  invariant(process.env.NEWSLETTER_FORM_ID, "NEWSLETTER_FORM_ID must be set");
  invariant(process.env.NEWSLETTER_TAGS, "NEWSLETTER_TAGS must be set");
  const newsletterApiUrl = process.env.NEWSLETTER_API_URL;
  const newsletterApiKey = process.env.NEWSLETTER_API_KEY;
  const newsletterFormId = process.env.NEWSLETTER_FORM_ID;
  const newsletterTags = process.env.NEWSLETTER_TAGS.split(" ");

  const res = await fetch(
    `${newsletterApiUrl}/forms/${newsletterFormId}/subscribe`,
    {
      method: "post",
      body: JSON.stringify({
        email,
        api_key: newsletterApiKey,
        tags: newsletterTags,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );

  return res.json();
};

export default function Index() {
  // const user = useOptionalUser();

  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const state: "idle" | "success" | "error" | "submitting" =
    navigation.state === "submitting"
      ? "submitting"
      : actionData?.subscription
      ? "success"
      : actionData?.error
      ? "error"
      : "idle";

  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (state === "error") {
      inputRef.current?.focus();
    }

    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }

    if (state === "success") {
      successRef.current?.focus();
    }

    mounted.current = true;
  }, [state]);

  return (
    <main className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
            Hezino
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Developing modern software solutions for our customer needs.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </div>
                Push to deploy
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                suspendisse semper morbi. Odio urna massa nunc massa.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                SSL certificates
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Sit quis amet rutrum tellus ullamcorper ultricies libero dolor
                eget. Sem sodales gravida quam turpis enim lacus amet.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
                Simple queues
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Quisque est vel vulputate cursus. Risus proin diam nunc commodo.
                Lobortis auctor congue commodo diam neque.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                    />
                  </svg>
                </div>
                Advanced security
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis
                aliquet hac quis. Id hac maecenas ac donec pharetra eget.
              </dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl lg:text-center">
          <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
            Follow our lastest news!
          </h2>
          <Form replace method="post">
            <fieldset disabled={state === "submitting"}>
              <input
                className="mr-4 w-96 rounded border border-indigo-600 py-2 pl-4 focus:border-indigo-600 focus:outline-none"
                aria-label="Email address"
                aria-describedby="error-message"
                ref={inputRef}
                type="email"
                name="email"
                placeholder="Enter your email"
              />

              <button
                className="rounded bg-indigo-600 px-4 py-2 text-white"
                type="submit"
              >
                {state === "submitting" ? "Subscribing..." : "Subscribe"}
              </button>
            </fieldset>

            <p id="error-message">
              {state === "error" ? actionData.message : <>&nbsp;</>}
            </p>
          </Form>

          {state === "success" ? (
            <div>
              <h2 ref={successRef} tabIndex={-1}>
                You&#39;ve subscribed!
              </h2>
              <p>Please check your email to confirm your subscription.</p>
              <Link className="text-underline" to=".">
                Start over.
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
