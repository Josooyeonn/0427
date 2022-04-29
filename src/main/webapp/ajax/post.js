/**
 * post.js 
 */

document.addEventListener('DOMContentLoaded', init)

// 리스트
function init() {
	let xhtp = new XMLHttpRequest(); // <<<<<<< 중요 >>>>>>>
	xhtp.open('get', '../StudentList.json');
	xhtp.send();
	xhtp.onload = function () {
		let data = JSON.parse(xhtp.responseText);
		console.log(data);

		let tbodyList = document.getElementById('list');

		data.forEach(function (elem) {
			let newTr = makeTr(elem)
			tbodyList.appendChild(newTr);
		})
	} //end of onload
	let modBtn = document.querySelector('input[type="button"]');
	modBtn.addEventListener('click', function () {
		let no = document.querySelector('input[name=sno]').value;
		let name = document.querySelector('input[name=sname]').value;
		let eScore = document.querySelector('input[name=eScore]').value;
		let kScore = document.querySelector('input[name=kScore]').value;

		let xhtp = new XMLHttpRequest();
		xhtp.open('get', `modStudentServlet?a=${no}&b=${name}&c=${eScore}&d=${kScore}`);
		xhtp.send();
		xhtp.onload = function () {
			let result = JSON.parse(xhtp.responseText);
			//
			if (result.retCode == 'OK') {
				// 결과값으로 받은 값 => 새로운 tr
				alert(result.studentNo + '번이 변경되었습니다.')
				let obj = {
					studentNo: result.studentNo,
					studentName: result.studentName,
					engScore: result.engScore,
					korScore: result.korScore
				}
				let newTr = makeTr(obj);
				let oldTr = document.getElementById(result.studentNo)
				document.getElementById('list').replaceChild(newTr, oldTr); // 새로운 tr => 이전 tr 대체
			} else {
				alert('변경 중 오류.')
			}
		}
	})
} // end of init()


// 변경처리

function modStudent() {



}



// 한건 추가
function addStudent(e) {
	e.preventDefault(); // submit(추가 버튼) -> 차단
	console.log(e);

	let no = document.querySelector('input[name="sno"]').value; // name이 sno라는 input태그를 가져오겠다. value값에 그 태그를 추가한다.
	let name = document.querySelector('input[name = "sname"]').value;
	let eng = document.querySelector('input[name = "eScore"]').value;
	let kor = document.querySelector('input[name="kScore"]').value;


	let xhtp = new XMLHttpRequest(); // 비동기방식으로 서버의 파일 요청
	xhtp.open('get', `addStudentServlet?sno=${no}&sname=${name}&eScore=${eng}&kScore=${kor}`); // 두번째가 요청 페이지, get방식으로 요청
	xhtp.send();
	xhtp.onload = function () {
		console.log(xhtp.responseText); // {"retCode":"Success"}
		let result = JSON.parse(xhtp.responseText); // {retCode:"Success"}
		if (result.retCode == 'Success') {
			//리스트에 새로운 값 추가
			successCallBack2(result); //
		} else if (result.retCode == 'Fail') {
			// 처리 중 에러가 발생. (메세지 출력)
			failCallBack();
		}
	} // end of function()
} // end of addStudent(e)

function successCallBack2(retObj) {

	console.log(retObj)
	let obj = {
		studentNo: retObj.studentNo,
		stuName: retObj.studName,
		engScore: retObj.engScore,
		korScore: retObj.korScore
	}
	document.getElementById('list').appendChild(makeTr(obj));
}


// makeTr
function makeTr(student) {

	let tr = document.createElement('tr');
	tr.setAttribute('id', student.studentNo) // 라인삭제를 위해 아이디 지정 후 getElementById(id).remove(); 로 표현함.
	for (let field in student) {
		let td = document.createElement('td');
		td.innerHTML = student[field];
		tr.appendChild(td);
	}

	// 삭제버튼 생성
	let delBtn = document.createElement('button'); // <button></button>
	delBtn.innerHTML = '삭제';

	// 이벤트 등록
	delBtn.addEventListener('click', function () {
		//삭제 (id파악 => ajax호출) : this => 이벤트 대상의 element (delBtn)	
		let id = this.parentElement.parentElement.firstChild.innerHTML;

		let xhtp = new XMLHttpRequest();
		xhtp.open('get', 'DelStudentServlet?delId=' + id);
		xhtp.send();
		xhtp.onload = function () {
			console.log(xhtp.responseText)
			let result = JSON.parse(xhtp.responseText);
			if (result.retCode == 'OK') {
				alert(result.retVal + '번이 삭제되었습니다.')
				document.getElementById(result.retVal).remove(); // result.retVal : 삭제할 ID		
			} else {
				console.log(result.retVal);
			}

		}

	});

	let td = document.createElement('td'); // <td></td>
	td.appendChild(delBtn); // <td><button>삭제</button></td>
	tr.appendChild(td);

	return tr;
}

// 정상 실행시 콜백
function successCallBack() {
	// 사용자 입력값을 id='list' 하위 추가.//

	let obj = {};

	let no = document.querySelector('input[name="sno"]').value; // name이 sno라는 input태그를 가져오겠다. value값에 그 태그를 추가한다.
	let name = document.querySelector('input[name = "sname"]').value;
	let eng = document.querySelector('input[name = "eScore"]').value;
	let kor = document.querySelector('input[name="kScore"]').value;

	obj.StudentNo = no
	obj.StudentName = name
	obj.EngScore = eng
	obj.KorScore = kor

	let row = makeTr(obj);

	document.getElementById('list').appendChild(row);
}
// 에러 발생시 콜백
function failCallBack() {
	alert('처리 중 에러가 발생했습니다.')
}