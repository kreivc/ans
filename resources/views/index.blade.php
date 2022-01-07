<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ANS</title>
    <link rel="shortcut icon"
        href="https://res.cloudinary.com/dor0udr7t/image/upload/v1641521860/ans/team/ojsawytinpvykwkcgvj1.ico">
    <meta name="description"
        content="ANS is a simple and accessible forum for all you need. ANS provide all level solution from beginer to advance question.">
    <style>
        * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
        }

        .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 130px;
            transition: all 0.5s ease-in-out;

        }

        .loader .pair {
            position: absolute;
            width: 80px;
            height: 30px;
        }

        .loader .pair .dot {
            position: absolute;
            width: 30px;
            height: 30px;
            background: #586AEA;
            border-radius: 50%;
        }

        .loader .pair .dot-2 {
            right: 0px;
        }

        .loader .pair-2 {
            left: 50px;
        }

        .loader .pair-1 {
            animation: spin 1000ms ease-in-out infinite;
        }

        .loader .pair-2 {
            animation: spin 1000ms ease-in-out infinite reverse;
        }

        .loader .pair-1 .dot-1 {
            opacity: 0;
            animation: hide 1000ms ease-in-out infinite reverse;
        }

        .loader .pair-2 .dot-2 {
            opacity: 0;
            animation: hide 1000ms ease-in-out infinite;
        }

        @keyframes hide {

            0%,
            49% {
                opacity: 0;
            }

            50%,
            100% {
                opacity: 1;
            }
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            50%,
            100% {
                transform: rotate(180deg);
            }
        }

    </style>
</head>

<body>
    <div id="app">
        <div class="loader">
            <div class="pair pair-1">
                <div class="dot dot-1"></div>
                <div class="dot dot-2"></div>
            </div>
            <div class="pair pair-2">
                <div class="dot dot-1"></div>
                <div class="dot dot-2"></div>
            </div>
        </div>
    </div>
    <script src="/js/app.js"></script>
</body>

</html>
