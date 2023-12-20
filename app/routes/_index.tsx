import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";

import i18next from "~/i18next.server";

export const meta: MetaFunction = () => [
  { title: "Hezino", description: "Hezino homepage" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await i18next.getFixedT(request);
  const workInProgress = t("workInProgress");
  const followOurLatestNews = t("followOurLatestNews");

  return json({
    translations: {
      workInProgress,
      followOurLatestNews,
    },
  });
}

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
  const { translations } = useLoaderData<typeof loader>();
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
    <>
      <header className="p-20">
        <h1 className="text-center text-5xl font-bold tracking-tight text-indigo-600">
          Hezino
        </h1>

        <h3 className="text-center text-xs">{translations.workInProgress}</h3>
      </header>

      <main className="bg-white text-center">
        <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
          {translations.followOurLatestNews}
        </h2>

        <Form replace method="post">
          <fieldset disabled={state === "submitting"}>
            <input
              className="mb-4 mr-4 rounded border border-indigo-600 py-2 pl-4 focus:border-indigo-600 focus:outline-none"
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

          {state === "error" ? (
            <p id="error-message">{actionData.message + "."}</p>
          ) : null}

          {state === "success" ? (
            <div>
              <h2 ref={successRef} tabIndex={-1}>
                You&#39;ve subscribed!
              </h2>

              <p>Please check your email to confirm your subscription.</p>
            </div>
          ) : null}
        </Form>
      </main>
    </>
  );
}
