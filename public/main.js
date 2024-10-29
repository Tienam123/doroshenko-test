const arrFiles = [];
let singleFile = null;
let currentPage = 1;
let orderSort = 'asc';
const selectSort = document.querySelector('.js-choise');
let selectedSort = selectSort.value;
const form = document.querySelector('.js-form');
const backdrop = document.querySelector('.backdrop');
backdrop.addEventListener('click', async (e) => {
    if (e.target !== e.currentTarget) {
        return
    }
    backdrop.classList.add('is-hidden');
})
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData)

    try {
        const data = await fetch('http://localhost/api/files/edit-all',{
            method: 'POST',
            body: formData,
        });
    } catch (e) {
    }
})
async function getAllFiles(page = currentPage, sort = selectedSort, order = orderSort) {
    const current = page ? page : 1;
    const selected = sort ? sort : 'name';
    const newOrder = order ? order : 'asc';
    const res = await fetch(`http://localhost/api/files?page=${page}&sortField=${sort}&sortOrder=${newOrder}`);
    return res.json()
}

function createFilesMarkup(data) {
    function getMarkup(file) {
        return `<li class="content-files__item content-file-item">
                            <div class="content-file-item__header">
                                <button type="button" class="_icon-check"></button>
                                <button type="button" class="_icon-close"></button>
                            </div>
                            <div class="content-file-item__main" >
                           <label>
                                    <span style="width: 50px;height: 50px">
                                    <svg
                                                xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                viewBox="0 0 25 25"
                                                fill="none"><path
                                                    d="M19.082 3.5H16.832V2.75C16.832 2.55109 16.753 2.36033 16.6124 2.21968C16.4717 2.07903 16.2809 2.00001 16.082 2H8.58203C8.38312 2.00001 8.19236 2.07903 8.05171 2.21968C7.91106 2.36033 7.83204 2.55109 7.83203 2.75V3.5H5.58203C5.18435 3.50045 4.80308 3.65864 4.52187 3.93984C4.24067 4.22105 4.08249 4.60231 4.08203 5V20.75C4.08249 21.1477 4.24067 21.529 4.52187 21.8102C4.80308 22.0914 5.18435 22.2495 5.58203 22.25H19.082C19.4797 22.2495 19.861 22.0914 20.1422 21.8102C20.4234 21.529 20.5816 21.1477 20.582 20.75V5C20.5816 4.60231 20.4234 4.22105 20.1422 3.93984C19.861 3.65864 19.4797 3.50045 19.082 3.5ZM9.33203 3.5H15.332V5.75H9.33203V3.5ZM15.332 15.5H9.33203C9.13312 15.5 8.94235 15.421 8.8017 15.2803C8.66105 15.1397 8.58203 14.9489 8.58203 14.75C8.58203 14.5511 8.66105 14.3603 8.8017 14.2197C8.94235 14.079 9.13312 14 9.33203 14H15.332C15.5309 14 15.7217 14.079 15.8624 14.2197C16.003 14.3603 16.082 14.5511 16.082 14.75C16.082 14.9489 16.003 15.1397 15.8624 15.2803C15.7217 15.421 15.5309 15.5 15.332 15.5ZM15.332 12.5H9.33203C9.13312 12.5 8.94235 12.421 8.8017 12.2803C8.66105 12.1397 8.58203 11.9489 8.58203 11.75C8.58203 11.5511 8.66105 11.3603 8.8017 11.2197C8.94235 11.079 9.13312 11 9.33203 11H15.332C15.5309 11 15.7217 11.079 15.8624 11.2197C16.003 11.3603 16.082 11.5511 16.082 11.75C16.082 11.9489 16.003 12.1397 15.8624 12.2803C15.7217 12.421 15.5309 12.5 15.332 12.5Z"
                                                    fill="currentColor"/></svg>
                                    </span>
                                    <input type="file" class="js-file-input" data-id="${file.id}" hidden name="">
                                </label>
                                <p class="file-item__text" style="max-width: 100%;text-align: center" data-id="${file.id}">${file.name}</p></div>
                            <div class="content-file-item__footer">
                                <button class="_icon-upload js-upload"></button>
                                <button class="_icon-share"></button>
                                <button class="_icon-edit"></button>
                            </div>
                        </li>`
    }

    function createMarkup(files) {
        const res = files.map(file => getMarkup(file))
        return res.join('')
    }

    const markup = createMarkup(data.files)
    const menu = document.querySelector('.content-files__menu');
    renderElements(menu, markup);
}

const createPaginationMarkup = (data) => {
    currentPage = data.current_page;

    function getMarkup(current, total) {
        const prevPage = current - 1 > 0 ? current - 1 : 0;
        const nextPage = current + 1 <= total ? current + 1 : 0;
        let markup = `<button class="_icon-arrow" ${!prevPage ? 'disabled' : ''} data-page="${prevPage}"></button>`;
        for (let i = 1; i <= total; i++) {
            const btn = `<button type='button' style="color: ${current === i ? 'green' : ''}" data-page='${i}'>${i}</button>`
            markup += btn;
        }
        markup += `<button class="_icon-arrow" ${!nextPage ? 'disabled' : ''} data-page="${nextPage}"></button>`
        return markup;
    }

    const paginationMenu = document.querySelector('.files__pagination');
    const markup = getMarkup(data.current_page, data.total_page);
    renderElements(paginationMenu, markup)

    function handleClickElements() {
        const buttons = document.querySelectorAll('button[data-page]');
        Array.from(buttons).forEach((button) => {
            button.addEventListener('click', async (e) => {
                const page = e.target.dataset.page;
                const {data} = await getAllFiles(page);
                createPaginationMarkup(data);
                createFilesMarkup(data);
                handleClickFileCard()
                handleClickFileInput()
                handleClickUploadBtn()
            })
        })
    }

    handleClickElements()
}

function renderElements(element, markup) {
    element.innerHTML = '';
    element.insertAdjacentHTML("afterbegin", markup);
}


function handleClickFileCard() {
    const files = document.querySelectorAll('.content-file-item');
    files.forEach(file => {
        file.addEventListener('click', async (e) => {
            e.target.classList.toggle('_selected');
        })
    })
}

function handleClickFileInput() {
    const inputFiles = document.querySelectorAll('.js-file-input');
    inputFiles.forEach(file => {
        file.addEventListener('change', async (e) => {
            const parent = e.target.parentElement.parentElement;
            const elementFileName = parent.querySelector('.file-item__text')
            const newFile = {id: +elementFileName.dataset.id, file: e.target.files[0]}
            elementFileName.textContent = newFile.file.name
            singleFile = newFile;
        })
    })
}

function handleClickUploadBtn() {
    const btns = document.querySelectorAll('.js-upload');
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const input = e.target.parentElement.parentElement.querySelector('.file-item__text');
            const elementFileID = Number(e.target.parentElement.parentElement.querySelector('.file-item__text').dataset.id)
            if (!singleFile) {
                alert('No file selected');
                return
            }
            const res = await sendFileToServer(singleFile);
            input.textContent = res.data.file
        })
    })
}

function handleSelectAllBtn() {
    const checkbox = document.querySelector('.action-items__select-all');
    checkbox.checked = false;
    checkbox.addEventListener('change', async (e) => {
        const elements = document.querySelectorAll('.content-file-item');
        elements.forEach(element => {
            element.classList.toggle('_selected');
        })
    })
}

function handleClickSortByAscDesc() {
    const sortedBtn = document.querySelector('.js-sortOrder');
    sortedBtn.addEventListener('click', async (e) => {
        e.currentTarget.classList.toggle('_active');
        const icon = [...e.currentTarget.children][0];
        icon.style.transition = 'transform 0.3s ease';
        if (e.currentTarget.classList.contains('_active')) {
            icon.style.transform = 'rotate(-180deg)';
            orderSort = 'desc'
            try {
                const {data} = await getAllFiles(currentPage, selectedSort, orderSort);
                createFilesMarkup(data)
                handleClickFileCard();
                handleClickUploadBtn();
                handleClickFileInput();
            } catch (e) {
            }

        } else {
            icon.style.transform = '';
            orderSort = 'asc'
            try {
                const {data} = await getAllFiles(currentPage, selectedSort, orderSort);
                createFilesMarkup(data)
                handleClickFileCard();
                handleClickUploadBtn();
                handleClickFileInput();
            } catch (e) {
            }
        }
    })
}

function handleClickSortInput() {
    selectSort.addEventListener('change', async (e) => {
        selectedSort = e.target.value;
        try {
            const {data} = await getAllFiles(currentPage, selectedSort);
            createFilesMarkup(data)
            handleClickFileInput();
            handleClickFileCard();
            handleClickUploadBtn();
        } catch (e) {
        }
    })
}

function handleClickDownloadAll() {
    const btnSend = document.querySelector('.action-items__send-all');
    btnSend.addEventListener('click', async (e) => {
        const elements = document.querySelectorAll('.content-file-item._selected');
        const data = Array.from(elements);

        if (data.length > 0) {
            data.forEach(element => {
                const file = element.querySelector('.js-file-input').files[0];
                const fileId = +element.querySelector('.js-file-input').dataset.id;
                if (file) {
                    arrFiles.push({id: fileId, file});
                }
            })
            if (arrFiles.length > 0) {
                sendFilesToServer(arrFiles)
            } else {
                alert('Нет файлов для загрузки')
            }
        }

    })
}

async function sendFilesToServer(arr) {
    const formData = new FormData();
    arr.forEach((element) => {
        formData.append(`file_${element.id}`, element.file);
    })
    console.log(formData)
    try {
        const data = await fetch('http://localhost/api/files/', {
            method: 'POST',
            body: formData
        });
        const res = await data.json();
        console.log(res)
    } catch (e) {

    }
}

async function sendFileToServer({file, id}) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    try {
        const data = await fetch('http://localhost/api/file/', {
            method: 'POST',
            body: formData,
        });
        return await data.json();
    } catch (e) {
        console.error(e)
    }
}

function handleClickResizeAll() {
    const btnResize = document.querySelector('.action-items__resize-all');
    btnResize.addEventListener('click', async (e) => {
        const elements = Array.from(document.querySelectorAll('.content-file-item._selected'));
        elements.forEach(element => {
            const item = element.querySelector('label span');
            console.log(item)
            let itemWidth = item.clientWidth + 5;
            let itemHeight = item.clientHeight + 5;
            item.style.width = itemWidth + 'px'
            item.style.height = itemHeight + 'px'
        })
    })
}

function handleClickDeleteMany() {
    const btnDelete = document.querySelector('.action-items__delete-all');
    const idToDeleteMany = [];
    btnDelete.addEventListener('click', async (e) => {
        const elements = Array.from(document.querySelectorAll('.content-file-item._selected'));
        console.log(elements)
        elements.forEach(element => {
            const itemId = element.querySelector('.file-item__text').dataset.id;
            const itemName = element.querySelector('.file-item__text').textContent;
            idToDeleteMany.push({id: itemId, name: itemName});
        })
        try {
            deleteManyFiles(idToDeleteMany)
        } catch (e) {
            console.error(e.message)
        }
    })
}


async function deleteManyFiles(arr) {
    const formData = new FormData();
    console.log(arr)
    arr.forEach((element) => {
        formData.append(`file_${element.id}`, element.name);
    })
    try {
        const data = await fetch('http://localhost/api/files/delete-many', {
            method: 'POST',
            body: formData,
        })
    } catch (e) {
        console.error(e)
    }
}


function handleClickDownloadAllFromServer() {
    const downBtn = document.querySelector('.action-items__download-all');
    downBtn.addEventListener('click', async (e) => {
        const elements = Array.from(document.querySelectorAll('.content-file-item._selected')).map(element => {
            return +element.querySelector('.js-file-input').dataset.id;
        });
        const formData = new FormData();
        elements.forEach((element) => {
            formData.append(`elements[]`, element);
        })
        try {
          const res =  await fetch('http://localhost/api/files/download-many', {
                method: 'POST',
                body:formData,
            })
            const data =  await res.json();
            console.log(data)
            const link = document.createElement('a');
            link.href = data.message; // Замените на ссылку на файл
            link.download ='files'; // Замените на имя файла для сохранения
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
        }
    })
}

function handleOpenModal() {
    backdrop.classList.remove('is-hidden');
}

function handleClickEditAll() {

    const editBtn = document.querySelector('.action-items__edit-all');
    console.log(editBtn)
    editBtn.addEventListener('click', async (e) => {
        handleOpenModal()
        const elements = Array.from(document.querySelectorAll('.content-file-item._selected'));
        console.log(elements)
        elements.forEach(element => {
            const elementId = element.querySelector('.file-item__text').dataset.id;
            const elementName = element.querySelector('.file-item__text').textContent;
            console.log(elementId,elementName)
            const form = document.querySelector('.backdrop form');

            form.insertAdjacentHTML('afterbegin', `<input type="text" name="file_${elementId}" value="${elementName}">`);
        })



    })

}

async function main() {
    try {
        const {data} = await getAllFiles();
        createFilesMarkup(data);
        createPaginationMarkup(data);
        handleClickSortInput()
        handleClickSortByAscDesc();
        handleClickFileCard();
        handleClickUploadBtn();
        handleSelectAllBtn();
        handleClickDownloadAll();
        handleClickDownloadAllFromServer()
        handleClickFileInput();
        handleClickResizeAll();
        handleClickDeleteMany();
        handleClickEditAll()
    } catch (e) {
    }

}

window.addEventListener('DOMContentLoaded', () => {
    main();
});