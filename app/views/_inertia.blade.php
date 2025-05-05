<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="https://zero.leafphp.dev/assets/img/logo.png" type="image/x-icon">
    <title inertia>Selll - The easiest way to sell online</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&amp;display=swap"
      rel="stylesheet"
    />
    @viteReactRefresh
    @vite(['/js/app.jsx', "/js/pages/{$page['component']}.jsx"])
    @inertiaHead

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-28PQM4WL3L"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'G-28PQM4WL3L');
    </script>
</head>

<body>
    @inertia
</body>

</html>
