import "@/styles/globals.css";
import Script from "next/script";
import Router from "next/router";
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import * as gtag from "../lib/gtag";

export default function App({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {
			/* invoke analytics function only for production */
			if (isProduction) gtag.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				strategy="afterInteractive"
			/>

			<Script id="google-analytics" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
			</Script>

			<Head>
				<title>Welcome!</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>

			<Component {...pageProps} />
		</>
	);
}
