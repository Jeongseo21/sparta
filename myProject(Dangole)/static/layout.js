
$(document).ready(function () {
    // index.html 로드가 완료되면 자동으로 show_videos() 함수를 호출합니다.
    show_videos();
    getMessages();
    show_memos();
});

function openclose() {
    let status = $('#post-box').css('display');
    if (status === 'block') {
        $('#post-box').hide();
    } else {
        $('#post-box').show();
    }
}

function show_videos() {
    // 1. #video_box의 내부 html 태그를 모두 삭제합니다.
    $('#video-box').empty()

    // 2. 서버에 1) GET 방식으로, 2) /list/getVideo 라는 주소로 videos_list를 요청합니다.
    $.ajax({
        type: "GET",
        url: "/list/getVideo",
        data: {},
        success: function (response) {
            // 3. 서버가 돌려준 videos_list를 videos라는 변수에 저장합니다.
            let videos = response['videos_list']

            for (let i = 0; i < videos.length; i += 3) {
                let video1 = videos[i], video2 = videos[i + 1], video3 = videos[i + 2]

                let videoId1 = video1['videoId']
                let title1 = video1['title']
                let desc1 = video1['desc']
                let img_url1 = video1['img_url']
                let channelTitle1 = video1['channelTitle']
                let publishTime1 = video1['publishTime']

                let videoId2 = video2['videoId']
                let title2 = video2['title']
                let desc2 = video2['desc']
                let img_url2 = video2['img_url']
                let channelTitle2 = video2['channelTitle']
                let publishTime2 = video2['publishTime']

                let videoId3 = video3['videoId']
                let title3 = video3['title']
                let desc3 = video3['desc']
                let img_url3 = video3['img_url']
                let channelTitle3 = video3['channelTitle']
                let publishTime3 = video3['publishTime']

                // 6. 영상 카드를 만듭니다.
                let temp_html = ` <div class="card-deck">
                                  <div class="card">
                                  <img class="card-img-top" src="${img_url1}" alt="Card image cap">
                                  <div class="card-body">
                                    <a href="https://www.youtube.com/watch?v=${videoId1}" target="_blank"><h5 id="title">${title1}</h5></a>
                                    <p class="card-text">${desc1}</p>
                                    <p class="card-text"><small class="text-muted">${channelTitle1}</small></p>
                                    <p class="card-text"><small class="text-muted">${publishTime1}</small></p>
                                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onclick="savePost('${title1}')">보관함에 저장</button>
                                  </div>
                                </div>
                                
                                <div class="card">
                                  <img class="card-img-top" src="${img_url2}" alt="Card image cap">
                                  <div class="card-body">
                                    <a href="https://www.youtube.com/watch?v=${videoId2}" target="_blank"><h5 id="title">${title2}</h5></a>
                                    
                                    <p class="card-text">${desc2}</p>
                                    <p class="card-text"><small class="text-muted">${channelTitle2}</small></p>
                                    <p class="card-text"><small class="text-muted">${publishTime2}</small></p>
                                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onclick="savePost('${title2}')">보관함에 저장</button>
                                  </div>
                                </div>
                                
                                <div class="card">
                                  <img class="card-img-top" src="${img_url3}" alt="Card image cap">
                                  <div class="card-body">
                                    <a href="https://www.youtube.com/watch?v=${videoId3}" target="_blank"><h5 id="title">${title3}</h5></a>
                                    
                                    <p class="card-text">${desc3}</p>
                                    <p class="card-text"><small class="text-muted">${channelTitle3}</small></p>
                                    <p class="card-text"><small class="text-muted">${publishTime3}</small></p>
                                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onclick="savePost('${title3}')">보관함에 저장</button>
                                  </div>
                                </div>
                                </div><br>`
                // 7. #video-box에 temp_html을 붙입니다.
                $('#video-box').append(temp_html)
            }
        }
    });
}

function savePost(title) {
    //title을 받아왔음, ajax로 해당 영상 정보 가져오기
    $('#title_save').empty();

    $.ajax({
        type: "POST",
        url: "/list/sendTitle",
        data: { 'title_give': title },
        success: function (response) {
            if (response['result'] == 'success') {
                let titles = response['title_one'];

                for (let i = 0; i < titles.length; i++) {
                    let title_one = titles[i];
                    let title = title_one['title'];
                    let thumbnail = title_one['img_url']
                    let videoId = title_one['videoId']

                    let temp_html = `<label for="restaurant" class="col-form-label">영상 이름 : </label>
              <input type="text" class="form-control" name="title" value="${title}" readonly>

              <label for="restaurant" class="col-form-label">영상 썸네일 : </label>
              <input type="text" class="form-control" name="thumbnail" value="${thumbnail}" readonly>

              <label for="restaurant" class="col-form-label">영상 Id : </label>
              <input type="text" class="form-control" name="videoId" value="${videoId}" readonly>`

                    $('#title_save').append(temp_html);

                }

            }
        }
    })

}

function getInputValue() {
    var title = $('input[name=title]').val();
    var thumbnail = $('input[name=thumbnail]').val();
    var videoId = $('input[name=videoId]').val();
    var restaurant = $('input[name=restaurant]').val();
    var food_catg = $('input[name=food_catg]').val();
    var location = $('input[name=location]').val();
    var memo = $('textarea#message-text').val();

    $.ajax({
        type: "POST",
        url: "/list/saveMemo",
        data: {
            'title_give': title, 'thumbnail_give': thumbnail, 'videoId_give': videoId,
            'restaurant_give': restaurant, 'food_catg_give': food_catg, 'location_give': location, 'memo_give': memo
        },
        success: function (response) {
            if (response['result'] == 'success') {
                let myVideo = response['myVideo'];

                alert("저장완료")
                // $('#exampleModal').modal('hide');
                // $('#exampleModal').hide();
                window.location.reload();

            }
        }
    })


}

function show_memos() {
    // 1. #video_box의 내부 html 태그를 모두 삭제합니다.
    $('#cards-mypage').empty()

    // 2. 서버에 1) GET 방식으로, 2) /list/getVideo 라는 주소로 videos_list를 요청합니다.
    $.ajax({
        type: "GET",
        url: "/mypage/getMemo",
        data: {},
        success: function (response) {
            if (response['result'] == 'success') {
                let memos = response['memos_list']

                for (let i = 0; i < memos.length; i++) {
                    let memo = memos[i]
                    let title = memo['title']
                    let thumbnail = memo['thumbnail']
                    let videoId = memo['videoId']
                    let restaurant = memo['restaurant']
                    let food_catg = memo['food_catg']
                    let location = memo['location']
                    let memo_contents = memo['memo']
                    let created_at = memo['created_at']


                    // 6. 영상 카드를 만듭니다.
                    let temp_html = ` 
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank"><h5>${title}</h5></a>
                    
                  </p>
                  <a href="#" class="card-header-icon" aria-label="more options">
                      <span class="icon">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                  </a>
                </header>
              <div class="memo-content">
                <div class="content">
                    <h5>#식당명 : ${restaurant}&nbsp&nbsp&nbsp
                    #카테고리 : ${food_catg}&nbsp&nbsp&nbsp
                    #위치 : ${location}</h5>
                    <hr>
                      <img src="${thumbnail}" width=200px align="right">
                      <h6>${memo_contents}</h5><br>
                    
                    <br>
                    <time datetime="2016-1-1" class="card-subtitle mb-2 text-muted">${created_at}</time>
                </div>
              </div>
              <footer class="card-footer" align="right">
                <a href="#" class="card-footer-item" onclick="deleteMemo('${memo_contents}')">삭제</a>
              </footer>
              </div><br>`
                    // 7. #video-box에 temp_html을 붙입니다.
                    $('#cards-mypage').append(temp_html)
                }
            }

        }
    });
}

function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 500) {
        alert('공백 포함 500자 이하로 입력해주세요.');
        return false;
    }
    return true;
}


//랜덤으로 유저이름을 생성
function randomName(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    let charactersLength = characters.length;
    //길에에 맞게 문자열 만들기
    for (let i = 0; i < length; i++) {
        //0보다 같거나 크고 chractersLength보다 짧은 문자열 만들기
        let number = Math.random() * charactersLength;
        //number를 정수로 만들기
        let index = Math.floor(number)
        //index 위치의 문자열 하나를 result에 더하기
        result += characters.charAt(index);
    }
    return result; //result를 반환한다.
}


function writePost() {
    let contents = $('#contents').val();

    if (isValidContents(contents) === false) {
        return;
    }

    let username = randomName(6);

    $.ajax({
        type: "POST",
        url: "/message",
        data: { 'username_give': username, 'contents_give': contents },
        success: function (response) {
            if (response['result'] == 'success') {

                window.location.reload();
            }
        }
    })
}

function getMessages() {
    $('#cards-box').empty();

    $.ajax({
        type: "GET",
        url: "/message",
        data: {},
        success: function (response) {
            if (response['result'] == 'success') {
                let messages = response['messages'];

                for (let i = 0; i < messages.length; i++) {
                    let message = messages[i];
                    let username = message['username'];
                    let contents = message['contents'];
                    let created_at = message['created_at'];

                    addHTML(username, contents, created_at);
                }
            } else {
                alert('메세지를 불러오지 못했습니다.')
            }
        }
    })
}
//cards-box에 html붙이는 함수
function addHTML(username, contents, created_at) {
    let tempHtml = makeMessage(username, contents, created_at)
    $('#cards-box').append(tempHtml);
}
//붙일 html만들기
function makeMessage(username, contents, created_at) {
    return `<div class="card custom-card">
            <div class="card-body">
                <textarea id="${username}-textarea" class="area-edit" cols="80"></textarea>
                <h5 id="${username}-contents" class="card-title">${contents}</h5>
                <br>
                <h6 id="${username}-username"class="card-subtitle mb-2 text-muted">#익명(${username})</h6>
                <h6 class="card-subtitle mb-2 text-muted">#${created_at}</h6>
            </div>
            <footer class="card-footer">
              <div class="card-footer-footer" align="right">
                <a id="${username}-edit" href="#" class="card-footer-item" onclick="editPost('${username}')">수정</a>&nbsp &nbsp &nbsp 
                <a id="${username}-delete" href="#" class="card-footer-item" onclick="deletePost('${username}')">삭제</a>
              </div>
                <a id="${username}-cancel" href="#" class="card-footer-item area-edit" onclick="hideEdits('${username}')">취소</a></a>&nbsp &nbsp &nbsp 
                <a id="${username}-submit" href="#" class="card-footer-item area-edit" onclick="submitEdit('${username}')">수정완료</a>
              
            </footer>
        </div>`
}

function editPost(username) {
    showEdits(username);
    let contents = $(`#${username}-contents`).text();
    $(`#${username}-textarea`).val(contents);
}

function showEdits(username) {
    //수정 입력칸, 수업완료버튼, 취소 버튼 보여주기
    $(`#${username}-textarea`).show();
    $(`#${username}-submit`).show();
    $(`#${username}-cancel`).show();

    //메모 내용, 수정 버튼 숨기기
    $(`#${username}-contents`).hide();
    $(`#${username}-edit`).hide();
}

function hideEdits(username) {
    // 수정 입력 칸, 수정완료 버튼, 취소 버튼을 숨기기
    $(`#${username}-textarea`).hide();
    $(`#${username}-submit`).hide();
    $(`#${username}-cancel`).hide();

    // 메모 내용, 수정 버튼을 보여주기
    $(`#${username}-contents`).show();
    $(`#${username}-edit`).show();
}

function submitEdit(username) {
    // 수정된 메모 내용을 가져오고 올바른지 검사
    let contents = $(`#${username}-textarea`).val();
    if (isValidContents(contents) == false) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/message/edit",
        data: { username_give: username, contents_give: contents },
        success: function (response) {
            if (response['result'] == 'success') {

                // 변경된 메모를 보기 위해 창을 새로고침
                location.reload();
            } else {
                alert('메시지 변경에 실패했습니다.');
            }
        }
    });
}

function deletePost(username) {
    let delete_one = $(`#${username}-delete`).text();
    alert("삭제하시겠습니까?")
    $.ajax({
        type: "POST",
        url: "/message/delete",
        data: { username_give: username },
        success: function (response) {
            if (response['result'] == 'success') {
                // 변경사항 저정, 새로고침
                location.reload();
            } else {
                alert('메시지 삭제에 실패했습니다.');
            }
        }
    });
}

function deleteMemo(memo_contents) {
    alert("삭제하시겠습니까?")
    $.ajax({
        type: "POST",
        url: "/mypage/deleteMemo",
        data: { memo_give: memo_contents },
        success: function (response) {
            if (response['result'] == 'success') {
                // 변경사항 저정, 새로고침
                location.reload();
            } else {
                alert('메모 삭제에 실패했습니다.');
            }
        }
    });
}
