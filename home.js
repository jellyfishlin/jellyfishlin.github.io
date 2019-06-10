// 當網頁內容載入至記憶體後執行
$(() => {

    // 撲克牌值的編號為 0~51
    var allPoker = []

    var rand = (start, end) => {
        // 決定範圍
        var n = Math.abs(end - start) + 1

        // 放大 n 倍
        var r = Math.random() * n

        // 去除小數點
        r = Math.floor(r)

        // 做位移
        r = r + ((start <= end) ? start : end)

        return r
    }

    // 在畫面中產生一張值為 v 的撲克牌
    var dealCard = (v) => {

        var point = Math.floor(v / 4)
        var color = v % 4

        $img = $('<img>').attr('class', 'image')
            .attr('src', './back.png')
            .attr('poker-value', v)
            .attr('poker-point', point)
            .attr('poker-color', color)
            .attr('poker-back', true)
            .attr('poker-pic', true)

        $img.on('click', function() {
            var val = (+$(this).attr('poker-value')) + 1
            if ($(this).attr('poker-back') == 'true') {
                $(this).attr('src', './pic' + val + '.png')
                $(this).attr('poker-back', false)
            } else {
                $(this).attr('src', './back.png')
                $(this).attr('poker-back', true)
            }

        })

        $col = $('<div>').attr('class', 'col').append($img)

        $('#data').append($col)
    }

    var dealCard2 = (v) => {

        var point = Math.floor(v / 4)
        var color = v % 4

        $img = $('<img>').attr('class', 'image')
            .attr('src', './mistake.png')
            .attr('poker-value', v)
            .attr('poker-point', point)
            .attr('poker-color', color)
            .attr('poker-back', false)
            .attr('poker-pic', false)

        $img.on('click', function() {
            var val = (+$(this).attr('poker-value')) + 1
            if ($('#check').attr('disabled') = false) {
                $(this).attr('src', './mistake.png')
                $(this).attr('poker-back', false)
                $(this).attr('poker-pic', false)
            }


        })

        $col = $('<div>').attr('class', 'col').append($img)

        $('#data2').append($col)
    }

    //遊戲開始========================================

    $('#wager').on('click', function() {
        var total = 0
        $('#output').val(0)
        $('#data').empty()
        $('#data2').empty()
        $('#deal').attr('disabled', false)
        $('#wager').attr('disabled', true)

    })

    // 發一張牌
    var dealOne = () => {
        // 產成 52張新的撲克牌 ====================
        for (var i = 0; i <= 51; i++) {
            allPoker.push(i)
        }
        //========================================

        // 洗牌 ==================================
        var n = rand(100, 500)
        for (var i = 0; i < n; i++) {
            var r = rand(0, 51)
            var temp = allPoker[r]
            allPoker[r] = allPoker[0]
            allPoker[0] = temp
        }

        // 將前五張牌顯示在畫面上

        dealCard2(allPoker[0])

    }




    // 發五張牌
    var dealFive = () => {

        // 產成 52張新的撲克牌 ====================
        for (var i = 0; i <= 51; i++) {
            allPoker.push(i)
        }
        //========================================

        // 洗牌 ==================================
        var n = rand(100, 500)
        for (var i = 0; i < n; i++) {
            var r = rand(0, 51)
            var temp = allPoker[r]
            allPoker[r] = allPoker[0]
            allPoker[0] = temp
        }

        // 將前五張牌顯示在畫面上
        for (var i = 0; i < 5; i++) {
            dealCard(allPoker[i])
        }
    }

    // 使用者按下發牌按鈕
    $('#deal').on('click', function() {
        // 發牌前先把桌面清空
        $('#data').empty()
        $('#deal').attr('disabled', true)
        $('#check').attr('disabled', false)
            // 發牌
        dealFive()
        dealOne()
    })


    var t = 0
    var drawCard = () => {
        var imgs = $('img.image[poker-back=true]')
        for (let i = 0; i < imgs.length; i++) {

            t++
            var v = allPoker[5 + t];
            var point = Math.floor(v / 4)
            var color = v % 4
            $(imgs[i])
                .attr('src', './pic' + (v + 1) + '.png')
                .attr('poker-value', v)
                .attr('poker-point', point)
                .attr('poker-color', color)
                .attr('poker-back', false)
                .attr('poker-pic', true)
        }

    }



    var drawCard2 = () => {
            var imgs = $('img.image[poker-pic=false]')
            for (let i = 0; i < imgs.length; i++) {

                t++
                var v = allPoker[5 + t];
                var point = Math.floor(v / 4)
                var color = v % 4
                $(imgs[i])
                    .attr('src', './mistake.png')
                    .attr('poker-value', v)
                    .attr('poker-point', point)
                    .attr('poker-color', color)
                    .attr('poker-back', false)
                    .attr('poker-pic', false)

            }


        }
        // 使用者按下出牌
    var total = 0
    $('#check').on('click', function() {
        var color = ['梅花', '方塊', '愛心', '黑桃']
        var point = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

        poker_imglist = $('img.image[poker-back=true]')
        var poker_point = []

        let $img = $(poker_imglist[0]);
        poker_point.push(+$img.attr('poker-point'))

        if (poker_imglist.length > 1) {
            $('#title').text('錯誤')
            $('#restart').text('重出')
            $('#message').text('只能出一張')
            $('#dialog').modal('show')

        } else if (poker_imglist.length < 1) {
            $('#title').text('錯誤')
            $('#restart').text('重出')
            $('#message').text('未選擇')
            $('#dialog').modal('show')
        } else {
            var color = [1, 2, 3, 4]
            var point = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

            poker_imglist = $('img.image[poker-back=true]')
            var poker_point = []
            var poker_color = []
            let $img = $(poker_imglist[0]);
            poker_point.push(+$img.attr('poker-point'))
            poker_color.push(+$img.attr('poker-color'))

            var p = point[poker_point[0]]
            var c = color[poker_color[0]]

            if (p == 4 || p == 5 || p == 11) {
                p = 0
            } else if (p == 13) {
                total = 99
                p = 0
            } else if (p == 12) {
                if ((total + 20) > 99) {
                    total = total - 20
                    p = 0
                } else {
                    p = 20
                }
            } else if (p == 10) {
                if ((total + 10) > 99) {
                    total = total - 10
                    p = 0
                } else {
                    p = 10
                }
            } else if (p == 1 && c == 4) {
                total = 0
                p = 0
            }
            var w = total = total + p
            drawCard()

            $('#output').val(total + '該對方')
            $('#check2').attr('disabled', false)
            $('#check').attr('disabled', true)


            if (w > 99) {
                // 輸
                $('#title').text('勝負')
                $('#message').text('嘿嘿嘻嘻呵呵呵~~你輸了!!再來一場吧!')
                $('#dialog').modal('show')
                $('#restart').text('重新開始')
                $('#restart').on('click', function() {
                    javascript: window.location.reload()
                })
            }



        }
    })


    //按換對方

    $('#check2').on('click', function() {
        var color = [1, 2, 3, 4]
        var point = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

        poker_imglist2 = $('img.image[poker-pic=false]')
        var poker_point2 = []
        var poker_color2 = []
        let $img2 = $(poker_imglist2[0]);
        poker_point2.push(+$img2.attr('poker-point'))
        poker_color2.push(+$img.attr('poker-color'))


        var p2 = point[poker_point2[0]]
        var c2 = color[poker_color2[0]]


        if (p2 == 4 || p2 == 5 || p2 == 11) {
            p2 = 0
        } else if (p2 == 13) {
            total = 99
            p2 = 0
        } else if (p2 == 12) {
            if ((total + 20) > 99) {
                total = total - 20
                p2 = 0
            } else {
                p2 = 20
            }
        } else if (p2 == 10) {
            if ((total + 10) > 99) {
                total = total - 10
                p2 = 0
            } else {
                p2 = 10
            }
        } else if (p2 == 1 && c2 == 4) {
            total = 0
            p2 = 0
        }
        var y = total = total + p2

        drawCard2()

        $('#output').val(total + '該你了')
        $('#check').attr('disabled', false)
        $('#check2').attr('disabled', true)


        if (y > 99) {
            // 贏
            $('#title').text('勝負')
            $('#message').text('贏了耶耶耶~~ 再來一場吧!')
            $('#dialog').modal('show')
            $('#restart').text('重新開始')
            $('#restart').on('click', function() {
                javascript: window.location.reload()
            })



        }



    })

    $('#data').empty()
    $('#data2').empty()
})