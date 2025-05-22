<!doctype html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <title>{{ $order->customer->name }} just paid you!</title>
    <style media="all" type="text/css">
        /* -------------------------------------
    GLOBAL RESETS
------------------------------------- */

        body {
            font-family: Helvetica, sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 16px;
            line-height: 1.3;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%;
        }

        table td {
            font-family: Helvetica, sans-serif;
            font-size: 16px;
            vertical-align: top;
        }

        /* -------------------------------------
    BODY & CONTAINER
------------------------------------- */

        body {
            background-color: #fff;
            margin: 0;
            padding: 0;
        }

        .body {
            background-color: #fff;
            width: 100%;
        }

        .container {
            margin: 0 auto !important;
            max-width: 600px;
            padding: 0;
            padding-top: 24px;
            width: 600px;
        }

        .logo {
            display: block;
            margin: 0 auto !important;
            max-width: 40px;
            padding: 0;
            padding-bottom: 30px;
            width: 40px;
        }

        .banner-image {
            display: none;
        }

        .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 600px;
            padding: 0;
        }

        /* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */

        .main {
            background: #ffffff;
            border: 1px solid #eaebed;
            border-radius: 16px;
            width: 100%;
        }

        .wrapper {
            box-sizing: border-box;
            padding: 24px;
        }

        .header {
            clear: both;
            padding-top: 24px;
            text-align: center;
            width: 100%;
        }

        .header td,
        .header p,
        .header span,
        .header a {
            color: #9a9ea6;
            font-size: 24px;
            text-align: center;
        }

        .footer {
            clear: both;
            padding-top: 24px;
            text-align: center;
            width: 100%;
        }

        .footer td,
        .footer p,
        .footer span,
        .footer a {
            color: #9a9ea6;
            font-size: 14px;
            text-align: center;
        }

        /* -------------------------------------
    TYPOGRAPHY
------------------------------------- */

        p {
            font-family: Helvetica, sans-serif;
            font-size: 16px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 16px;
        }

        a {
            color: #ec504b;
            text-decoration: underline;
        }

        .title {
            color: #000;
            font-size: 24px;
            font-weight: 600;
            font-family: sans-serif;
            line-height: 2.6;
            margin: 0;
        }

        /* -------------------------------------
    BUTTONS
------------------------------------- */

        .btn {
            box-sizing: border-box;
            min-width: 100% !important;
            width: 100%;
        }

        .btn>tbody>tr>td {
            padding-bottom: 16px;
        }

        .btn table {
            width: auto;
        }

        .btn table td {
            background-color: #ffffff;
            border-radius: 4px;
            text-align: center;
        }

        .btn a {
            background-color: #ffffff;
            border: solid 2px #ec504b;
            border-radius: 4px;
            box-sizing: border-box;
            color: #ec504b;
            cursor: pointer;
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            margin: 0;
            padding: 12px 24px;
            text-decoration: none;
            text-transform: capitalize;
        }

        .btn-primary table td {
            background-color: #ec504b;
        }

        .btn-primary a {
            background-color: #ec504b;
            border-color: #ec504b;
            color: #ffffff;
        }

        @media all {
            .btn-primary table td:hover {
                background-color: #ec0867 !important;
            }

            .btn-primary a:hover {
                background-color: #ec0867 !important;
                border-color: #ec0867 !important;
            }
        }

        /* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */

        .last {
            margin-bottom: 0;
        }

        .first {
            margin-top: 0;
        }

        .align-center {
            text-align: center;
        }

        .align-right {
            text-align: right;
        }

        .align-left {
            text-align: left;
        }

        .text-link {
            color: #ec504b !important;
            text-decoration: underline !important;
        }

        .clear {
            clear: both;
        }

        .mt0 {
            margin-top: 0;
        }

        .mb0 {
            margin-bottom: 0;
        }

        .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0;
        }

        .powered-by a {
            text-decoration: none;
        }

        /* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */

        @media only screen and (max-width: 640px) {
            .logo {
                display: none;
            }

            .banner-image {
                display: block;
            }

            .main p,
            .main td,
            .main span {
                font-size: 16px !important;
            }

            .main p.title {
                font-size: 22px !important;
            }

            .wrapper {
                padding: 8px !important;
            }

            .content {
                padding: 0 !important;
            }

            .container {
                padding: 0 !important;
                padding-top: 8px !important;
                width: 100% !important;
            }

            .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
            }

            .btn table {
                max-width: 100% !important;
                width: 100% !important;
            }

            .btn a {
                font-size: 16px !important;
                max-width: 100% !important;
                width: 100% !important;
            }
        }

        /* -------------------------------------
    PRESERVE THESE STYLES IN THE HEAD
------------------------------------- */

        @media all {
            .ExternalClass {
                width: 100%;
            }

            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
                line-height: 100%;
            }

            .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
            }

            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
            }
        }
    </style>
</head>

<body>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
            <td>&nbsp;</td>
            <td class="container">
                <div class="content">
                    <div class="header">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="logo">
                                    <img src="https://selll.online/assets/img/logo.png" alt="Selll" width="40"
                                        height="60" style="width: 40px; height: 60px; border: none; display: block;">
                                </td>
                            </tr>
                            <tr>
                                <td class="banner-image">
                                    <img src="https://selll.online/assets/img/twitter-banner.png" alt="Selll"
                                        width="100%" height="140"
                                        style="width: 100%; height: 140px; border: none; display: block;">
                                </td>
                            </tr>
                            {{-- <tr>
                                <td>&nbsp;</td>
                            </tr> --}}
                        </table>
                    </div>

                    <!-- START CENTERED WHITE CONTAINER -->
                    <span class="preheader">{{ $order->customer->name }} just paid you &#128640;</span>
                    <table cellpadding="0" cellspacing="0" border="0" width="600" class="main"
                        style="background-color:#ffffff; margin:30px auto; border-collapse:collapse;">
                        <tr>
                            <td align="center" style="padding:40px 20px 10px; font-family:Arial, sans-serif;">
                                <h2 style="margin:0; font-size:18px; color:#333;">{{ $order->customer->name }} just paid you &#128640;</h2>
                                <p style="font-size:32px; font-weight:bold; color:#ec504b; margin:10px 0 0;">
                                    {{ $order->currency }} {{ $order->total }}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:20px 30px; font-family:Arial, sans-serif;">
                                <p style="font-size:16px; color:#555; margin-bottom:15px;">
                                    <strong>
                                        Transaction Details
                                    </strong>
                                </p>
                                <table width="100%" cellpadding="5" cellspacing="0"
                                    style="font-size:14px; color:#333;">
                                    <tr>
                                        <td width="50%">Customer</td>
                                        <td align="right">{{ $order->customer->name }}</td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td align="right">{{ tick($order->created_at)->format('DD MMMM, YYYY') }}</td>
                                    </tr>
                                    <tr>
                                        <td>Products in order</td>
                                        <td align="right">
                                            {{ count(json_decode($order->items)) }}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding:20px; font-family:Arial, sans-serif;">
                                <a href="https://selll.online/orders/{{ $order->id }}" style="color:#ec504b; font-size:14px; text-decoration:none;">View on
                                    dashboard</a>
                            </td>
                        </tr>
                    </table>

                    <!-- START FOOTER -->
                    <div class="footer">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="content-block">
                                    <span class="apple-link">Sent with &#9829; from Selll</span>
                                    <br> How fast can you selll?
                                </td>
                            </tr>
                            <tr>
                                <td class="content-block powered-by">
                                    Copyright 2025 - <a href="https://selll.online">selll.online</a>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- END FOOTER -->

                    <!-- END CENTERED WHITE CONTAINER -->
                </div>
            </td>
            <td>&nbsp;</td>
        </tr>
    </table>
</body>

</html>
