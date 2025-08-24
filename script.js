// 全局变量
let currentChapter = '';
let currentPoemIndex = 0;
let poems = [];
let currentExerciseType = 'auto';
let currentExerciseConfig = null;

// 多选模式相关变量
let selectedPoems = [];
let selectionMode = 'single';
let exerciseMode = 'complete';

// 分页相关变量
let currentPage = 0;
let questionsPerPage = 10;
let allQuestions = [];

// 内置备用数据库
const builtinPoemDatabase = {};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('古诗文默写系统已加载完成！');
    console.log('comprehensiveUtils:', comprehensiveUtils);
    console.log('comprehensiveDatabase:', comprehensiveDatabase);
    
    const activeDatabase = (typeof poemDatabase !== 'undefined') ? poemDatabase : builtinPoemDatabase;
    console.log('数据库包含章节：', Object.keys(activeDatabase));
    
    loadExternalData();
    setupSelectionModeListeners();
});

// 设置选择模式监听器
function setupSelectionModeListeners() {
    document.querySelectorAll('input[name="selectionMode"]').forEach(radio => {
        radio.addEventListener('change', function() {
            selectionMode = this.value;
            selectedPoems = [];
            if (currentChapter === '理解性默写') {
                displayComprehensiveArticles();
            } else {
                displayPoemList();
            }
        });
    });
    
    document.querySelectorAll('input[name="exerciseMode"]').forEach(radio => {
        radio.addEventListener('change', function() {
            exerciseMode = this.value;
            const randomSettings = document.getElementById('randomSettings');
            if (this.value === 'random') {
                randomSettings.style.display = 'block';
            } else {
                randomSettings.style.display = 'none';
            }
        });
    });
}

// 加载外部数据文件
function loadExternalData() {
    if (typeof poemDatabase !== 'undefined') {
        console.log('使用外部数据文件');
        return;
    }
    console.log('使用内置数据');
}

// 选择章节
function selectChapter(chapter) {
    console.log('选择章节：', chapter);
    currentChapter = chapter;
    
    if (chapter === '理解性默写') {
        // 进入理解性默写文章选择页面
        document.getElementById('chapterSelection').style.display = 'none';
        document.getElementById('poemSelection').style.display = 'block';
        document.getElementById('currentChapter').textContent = '理解性默写';
        displayComprehensiveArticles();
        return;
    }
    
    // 处理上下文默写 - 合并所有古诗文数据
    if (chapter === '古诗文精选') {
        const db = (typeof poemDatabase !== 'undefined') ? poemDatabase : builtinPoemDatabase;
        
        if (db) {
            poems = [];
            
            // 合并所有分类的数据
            Object.keys(db).forEach(key => {
                if (Array.isArray(db[key])) {
                    // 处理数组格式的数据（如必修一、必修二、必修三、论语必背、古诗文精选）
                    const categoryPoems = db[key].map((poem, index) => ({
                        id: poem.id || `${key}_${index}`,
                        title: poem.title,
                        author: poem.author,
                        content: poem.content,
                        sentences: poem.sentences,
                        exercises: poem.exercises
                    }));
                    poems = poems.concat(categoryPoems);
                } else if (db[key] && typeof db[key] === 'object') {
                    // 处理对象格式的数据（如 contextual、comprehensive）
                    Object.values(db[key]).forEach(poem => {
                        poems.push({
                            id: poem.id,
                            title: poem.title,
                            author: poem.author,
                            content: poem.content,
                            sentences: poem.sentences,
                            exercises: poem.exercises
                        });
                    });
                }
            });
        } else {
            poems = [];
        }
    } else {
        const db = (typeof poemDatabase !== 'undefined') ? poemDatabase : builtinPoemDatabase;
        poems = db[chapter] || [];
    }
    
    document.getElementById('chapterSelection').style.display = 'none';
    document.getElementById('poemSelection').style.display = 'block';
    document.getElementById('currentChapter').textContent = chapter;
    displayPoemList();
}

// 显示诗文列表
function displayPoemList() {
    const poemList = document.getElementById('poemList');
    poemList.innerHTML = '';
    
    poems.forEach((poem, index) => {
        const poemItem = document.createElement('div');
        poemItem.className = 'poem-item';
        poemItem.dataset.index = index;
        
        if (selectionMode === 'single') {
            poemItem.onclick = () => selectPoem(index);
        } else {
            poemItem.onclick = () => togglePoemSelection(index);
        }
        
        poemItem.innerHTML = `
            <div class="poem-checkbox" style="display: ${selectionMode === 'multi' ? 'block' : 'none'}">
                <input type="checkbox" id="poem_${index}" ${selectedPoems.includes(index) ? 'checked' : ''}>
            </div>
            <h4>${poem.title}</h4>
            <p class="author">${poem.author}</p>
        `;
        
        poemList.appendChild(poemItem);
    });
    
    updateActionButtons();
}

// 选择诗文（单选模式）
function selectPoem(index) {
    currentPoemIndex = index;
    const poem = poems[index];
    
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'block';
    document.getElementById('poemTitle').textContent = poem.title;
    
    displayPoem(poem);
}

// 切换诗文选择（多选模式）
function togglePoemSelection(index) {
    const checkbox = document.getElementById(`poem_${index}`);
    if (selectedPoems.includes(index)) {
        selectedPoems = selectedPoems.filter(i => i !== index);
        checkbox.checked = false;
    } else {
        selectedPoems.push(index);
        checkbox.checked = true;
    }
    updateActionButtons();
}

// 切换理解性默写文章选择（多选模式）
function toggleComprehensiveArticleSelection(articleId, index) {
    const checkbox = document.getElementById(`comprehensive_${articleId}`);
    if (selectedPoems.includes(articleId)) {
        selectedPoems = selectedPoems.filter(id => id !== articleId);
        checkbox.checked = false;
    } else {
        selectedPoems.push(articleId);
        checkbox.checked = true;
    }
    updateActionButtons();
}

// 更新操作按钮显示
function updateActionButtons() {
    const actionButtons = document.getElementById('actionButtons');
    const exerciseMode = document.getElementById('exerciseMode');
    
    if (selectionMode === 'multi') {
        actionButtons.style.display = 'block';
        exerciseMode.style.display = 'block';
        
        const startBtn = document.querySelector('.start-exercise-btn');
        if (selectedPoems.length > 0) {
            startBtn.disabled = false;
            startBtn.textContent = `开始练习 (${selectedPoems.length}篇)`;
        } else {
            startBtn.disabled = true;
            startBtn.textContent = '开始练习';
        }
    } else {
        actionButtons.style.display = 'none';
        exerciseMode.style.display = 'none';
    }
}

// 清除选择
function clearSelection() {
    selectedPoems = [];
    if (currentChapter === '理解性默写') {
        displayComprehensiveArticles();
    } else {
        displayPoemList();
    }
}

// 开始多选练习
function startMultiExercise() {
    if (selectedPoems.length === 0) {
        alert('请至少选择一篇古诗文！');
        return;
    }
    
    // 检查当前是否在理解性默写页面
    if (currentChapter === '理解性默写') {
        startComprehensiveMultiExercise();
        return;
    }
    
    const exerciseMode = document.querySelector('input[name="exerciseMode"]:checked').value;
    
    if (exerciseMode === 'complete') {
        startCompleteExercise();
    } else {
        startRandomExercise();
    }
}

// 开始完整题目练习
function startCompleteExercise() {
    const allSentences = [];
    selectedPoems.forEach(poemIndex => {
        const poem = poems[poemIndex];
        if (poem.exercises) {
            // 处理 poems-shangxiawen.js 格式
            poem.exercises.forEach(exercise => {
                if (exercise.items) {
                    exercise.items.forEach(item => {
                        allSentences.push({
                            front: item.front,
                            back: item.back,
                            poemTitle: poem.title,
                            poemAuthor: poem.author
                        });
                    });
                }
            });
        } else if (poem.sentences) {
            // 处理 poems-data.js 格式
            poem.sentences.forEach(sentence => {
                allSentences.push({
                    front: sentence.front,
                    back: sentence.back,
                    poemTitle: poem.title,
                    poemAuthor: poem.author
                });
            });
        }
    });
    
    // 移除空的back字段
    const validSentences = allSentences.filter(s => s.back && s.back.trim() !== '');
    
    // 打乱题目顺序
    const shuffledSentences = shuffleArray([...validSentences]);
    
    currentExerciseConfig = {
        type: 'multiComplete',
        title: `多篇完整练习 (${selectedPoems.length}篇)`,
        description: '所有选中古诗文的完整练习（已打乱顺序）',
        items: shuffledSentences,
        currentIndex: 0
    };
    
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'block';
    document.getElementById('poemTitle').textContent = currentExerciseConfig.title;
    
    displayMultiExercise();
}

// 开始随机练习
function startRandomExercise() {
    const totalQuestions = parseInt(document.getElementById('totalQuestions').value) || 10;
    
    const allSentences = [];
    selectedPoems.forEach(poemIndex => {
        const poem = poems[poemIndex];
        if (poem.exercises) {
            // 处理 poems-shangxiawen.js 格式
            poem.exercises.forEach(exercise => {
                if (exercise.items) {
                    exercise.items.forEach(item => {
                        allSentences.push({
                            front: item.front,
                            back: item.back,
                            poemTitle: poem.title,
                            poemAuthor: poem.author
                        });
                    });
                }
            });
        } else if (poem.sentences) {
            // 处理 poems-data.js 格式
            poem.sentences.forEach(sentence => {
                allSentences.push({
                    front: sentence.front,
                    back: sentence.back,
                    poemTitle: poem.title,
                    poemAuthor: poem.author
                });
            });
        } else if (poem.content) {
            // 如果没有预定义句子，从内容中生成
            const pairs = splitIntoFrontBackPairs(poem.content);
            pairs.forEach((pair, index) => {
                allSentences.push({
                    front: pair.front,
                    back: pair.back,
                    poemTitle: poem.title,
                    poemAuthor: poem.author,
                    source: `${poem.title} - ${poem.author}`
                });
            });
        }
    });
    
    // 移除空的back字段
    const validSentences = allSentences.filter(s => s.back && s.back.trim() !== '');
    const selectedSentences = selectRandomSentences(validSentences, totalQuestions);
    
    currentExerciseConfig = {
        type: 'multiRandom',
        title: `随机练习 (${totalQuestions}题)`,
        description: `从${selectedPoems.length}篇古诗文中随机抽取${totalQuestions}题`,
        items: selectedSentences,
        currentIndex: 0
    };
    
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'block';
    document.getElementById('poemTitle').textContent = currentExerciseConfig.title;
    
    displayMultiExercise();
}

// 随机选择句子，确保公平性
function selectRandomSentences(allSentences, count) {
    const poemGroups = {};
    allSentences.forEach(sentence => {
        const key = `${sentence.poemTitle}_${sentence.poemAuthor}`;
        if (!poemGroups[key]) {
            poemGroups[key] = [];
        }
        poemGroups[key].push(sentence);
    });
    
    const poemKeys = Object.keys(poemGroups);
    const selectedSentences = [];
    
    const minPerPoem = Math.floor(count / poemKeys.length);
    const remaining = count % poemKeys.length;
    
    poemKeys.forEach((key, index) => {
        const sentences = poemGroups[key];
        const selectCount = minPerPoem + (index < remaining ? 1 : 0);
        
        const shuffled = shuffleArray([...sentences]);
        selectedSentences.push(...shuffled.slice(0, selectCount));
    });
    
    return shuffleArray(selectedSentences);
}

// 数组随机打乱函数
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 显示多选练习
function displayMultiExercise() {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
    
    if (!currentExerciseConfig || currentExerciseConfig.items.length === 0) {
        questionsContainer.innerHTML = '<p>没有可用的练习题目</p>';
        return;
    }
    
    allQuestions = currentExerciseConfig.items;
    
    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
    currentPage = 0;
    
    const paginationControls = document.getElementById('paginationControls');
    if (totalPages > 1) {
        paginationControls.style.display = 'flex';
        updatePageInfo(totalPages);
    } else {
        paginationControls.style.display = 'none';
    }
    
    // 在标题右边添加"显示所有答案"按钮
    const poemTitle = document.getElementById('poemTitle');
    if (poemTitle && !poemTitle.querySelector('.show-all-answers-btn')) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';
        titleContainer.style.display = 'flex';
        titleContainer.style.alignItems = 'center';
        titleContainer.style.justifyContent = 'space-between';
        titleContainer.style.gap = '15px';
        
        const titleText = poemTitle.textContent;
        poemTitle.textContent = '';
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = titleText;
        titleContainer.appendChild(titleSpan);
        
        const showAllBtn = document.createElement('button');
        showAllBtn.className = 'show-all-answers-btn';
        showAllBtn.onclick = toggleAllAnswers;
        showAllBtn.textContent = '显示所有答案';
        titleContainer.appendChild(showAllBtn);
        
        // 添加重新打乱按钮（仅在多篇练习中显示）
        if (currentExerciseConfig && (currentExerciseConfig.type === 'multiComplete' || currentExerciseConfig.type === 'multiRandom')) {
            const reshuffleBtn = document.createElement('button');
            reshuffleBtn.className = 'reshuffle-btn';
            reshuffleBtn.onclick = reshuffleQuestions;
            reshuffleBtn.textContent = '🔀 重新打乱';
            reshuffleBtn.style.background = '#ff9800';
            reshuffleBtn.style.color = 'white';
            reshuffleBtn.style.border = 'none';
            reshuffleBtn.style.padding = '8px 16px';
            reshuffleBtn.style.borderRadius = '4px';
            reshuffleBtn.style.cursor = 'pointer';
            titleContainer.appendChild(reshuffleBtn);
        }
        
        // 添加字体大小调整控件
        const fontSizeControls = document.createElement('div');
        fontSizeControls.className = 'font-size-controls';
        fontSizeControls.innerHTML = `
            <label>题目字体：</label>
            <input type="range" id="questionFontSize" min="12" max="24" value="16" onchange="adjustFontSize('question', this.value)">
            <span id="questionFontSizeValue">16px</span>
            <label>答案字体：</label>
            <input type="range" id="answerFontSize" min="12" max="24" value="16" onchange="adjustFontSize('answer', this.value)">
            <span id="answerFontSizeValue">16px</span>
        `;
        titleContainer.appendChild(fontSizeControls);
        
        const hideAllBtn = document.createElement('button');
        hideAllBtn.className = 'hide-all-answers-btn';
        hideAllBtn.onclick = hideAllAnswers;
        hideAllBtn.textContent = '一键隐藏答案';
        hideAllBtn.style.display = 'none';
        titleContainer.appendChild(hideAllBtn);
        
        poemTitle.appendChild(titleContainer);
    }
    
    displayCurrentPage();
}

// 显示当前页的题目
function displayCurrentPage() {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
    
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, allQuestions.length);
    const currentQuestions = allQuestions.slice(startIndex, endIndex);
    

    
    currentQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        
        const questionNumber = startIndex + index + 1;
        
        questionDiv.innerHTML = `
            <div class="question-header">
                <span class="question-number">${questionNumber}</span>
                <button class="show-answer-btn" onclick="toggleAnswer(this, '${question.back || '（无后半句）'}')">显示答案</button>
                <span class="question-source">${question.poemTitle || '未知'} - ${question.poemAuthor || '未知'}</span>
            </div>
            <div class="question-content">
                <p class="question-text">${question.front}</p>
                <div class="answer-section">
                    <p class="answer-text" style="display: none;">答案：${question.back || '（无后半句）'}</p>
                </div>
            </div>
        `;
        
        questionsContainer.appendChild(questionDiv);
    });
}

// 更新页码信息
function updatePageInfo(totalPages) {
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.textContent = `第 ${currentPage + 1} 页，共 ${totalPages} 页`;
}

// 上一页
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayCurrentPage();
        updatePageInfo(Math.ceil(allQuestions.length / questionsPerPage));
    }
}

// 下一页
function nextPage() {
    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        displayCurrentPage();
        updatePageInfo(totalPages);
    }
}

// 显示诗文内容
function displayPoem(poem) {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
    
    // 检查是否有预定义的练习（poems-shangxiawen.js 格式）
    if (poem.exercises && poem.exercises.length > 0) {
        createExerciseSelector(poem);
    }
    // 检查是否有预定义的句子（poems-data.js 格式）
    else if (poem.sentences && poem.sentences.length > 0) {
        createSentenceBasedExercise(poem);
    }
    // 如果都没有，创建默认练习
    else {
        createDefaultExercise(poem);
    }
}

// 创建基于句子的练习
function createSentenceBasedExercise(poem) {
    const questionsContainer = document.getElementById('questionsContainer');
    
    const exerciseSelector = document.createElement('div');
    exerciseSelector.className = 'exercise-selector';
    
    const sentenceCount = poem.sentences.length;
    
    exerciseSelector.innerHTML = `
        <h4>选择练习方式：</h4>
        <div class="exercise-options">
            <div class="exercise-option" onclick="startSentenceExercise('fillBack')">
                <h5>整篇填后句</h5>
                <p>根据前半句填写后半句</p>
                <span class="exercise-type-badge">${sentenceCount}个句子</span>
            </div>
            <div class="exercise-option" onclick="startSentenceExercise('fillFront')">
                <h5>整篇填前句</h5>
                <p>根据后半句填写前半句</p>
                <span class="exercise-type-badge">${sentenceCount}个句子</span>
            </div>
        </div>
    `;
    
    questionsContainer.appendChild(exerciseSelector);
}

// 开始句子练习
function startSentenceExercise(type) {
    const poem = poems[currentPoemIndex];
    const sentences = poem.sentences;
    
    let questions = [];
    
    if (type === 'fillBack') {
        // 整篇填后句练习
        questions = sentences.map((sentence, index) => ({
            number: index + 1,
            front: sentence.front,
            back: sentence.back,
            source: `${poem.title} - ${poem.author}`,
            poemTitle: poem.title,
            poemAuthor: poem.author
        }));
    } else if (type === 'fillFront') {
        // 整篇填前句练习
        questions = sentences.map((sentence, index) => ({
            number: index + 1,
            front: sentence.back,
            back: sentence.front,
            source: `${poem.title} - ${poem.author}`,
            poemTitle: poem.title,
            poemAuthor: poem.author
        }));
    }
    
    // 移除空的back字段
    questions = questions.filter(q => q.back && q.back.trim() !== '');
    
    allQuestions = questions;
    
    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
    currentPage = 0;
    
    const paginationControls = document.getElementById('paginationControls');
    if (totalPages > 1) {
        paginationControls.style.display = 'flex';
        updatePageInfo(totalPages);
    } else {
        paginationControls.style.display = 'none';
    }
    
    // 移除选择器
    const selector = document.querySelector('.exercise-selector');
    if (selector) selector.remove();
    
    displayCurrentPage();
}

// 创建练习选择器
function createExerciseSelector(poem) {
    const questionsContainer = document.getElementById('questionsContainer');
    
    const existingSelector = document.querySelector('.exercise-selector');
    if (existingSelector) existingSelector.remove();
    
    questionsContainer.innerHTML = '';
    
    if (!poem.exercises || poem.exercises.length === 0) {
        createDefaultExercise(poem);
        return;
    }
    
    const exerciseSelector = document.createElement('div');
    exerciseSelector.className = 'exercise-selector';
    
    let selectorHTML = '<h4>选择练习方式：</h4><div class="exercise-options">';
    
    poem.exercises.forEach((exercise, index) => {
        selectorHTML += `
            <div class="exercise-option" onclick="selectExercise(${index})">
                <h5>${exercise.title}</h5>
                <p>${exercise.description}</p>
                <span class="exercise-type-badge">${getExerciseTypeName(exercise.type)}</span>
            </div>
        `;
    });
    
    selectorHTML += '</div>';
    
    selectorHTML += `
        <div class="exercise-type-selector" style="margin-top:16px;">
            <h4>整篇练习</h4>
            <div class="exercise-buttons">
                <button class="exercise-btn" onclick="startFullText('fillBack')">整篇填后句</button>
                <button class="exercise-btn" onclick="startFullText('fillFront')">整篇填前句</button>
            </div>
        </div>
    `;
    exerciseSelector.innerHTML = selectorHTML;
    
    questionsContainer.appendChild(exerciseSelector);
}

// 选择练习
function selectExercise(exerciseIndex) {
    const poem = poems[currentPoemIndex];
    currentExerciseConfig = poem.exercises[exerciseIndex];
    
    const selector = document.querySelector('.exercise-selector');
    if (selector) selector.remove();
    
    generateCustomExercise();
}

// 启动整篇自动生成的前/后句练习
function startFullText(type) {
    currentExerciseType = type === 'fillFront' ? 'fillFront' : 'fillBack';
    const selector = document.querySelector('.exercise-selector');
    if (selector) selector.remove();
    generateExercise();
}

// 生成自定义练习
function generateCustomExercise() {
    const questionsContainer = document.getElementById('questionsContainer');
    let exercise = currentExerciseConfig;
    
    console.log('生成自定义练习：', exercise);
    
    questionsContainer.innerHTML = '';
    
    if (exercise && exercise.autoFull === true && (exercise.type === 'fillFront' || exercise.type === 'fillBack')) {
        const poem = poems[currentPoemIndex];
        const pairs = splitIntoFrontBackPairs(poem.content);
        const items = pairs.map(p => ({ front: p.front, back: p.back }));
        exercise = { ...exercise, items };
    }

    let questions = [];

    if (exercise.type === 'auto') {
        const words = poems[currentPoemIndex].content.split('');
        const blanks = exercise.blanks || [];
        
        blanks.forEach((index, i) => {
            questions.push({
                number: i + 1,
                front: words.slice(0, index).join(''),
                back: words[index],
                source: `${poems[currentPoemIndex].title} - ${poems[currentPoemIndex].author}`,
                poemTitle: poems[currentPoemIndex].title,
                poemAuthor: poems[currentPoemIndex].author
            });
        });
        
    } else if (exercise.type === 'fillFront') {
        const items = exercise.items || [];
        
        items.forEach((item, index) => {
            if (exercise.type === 'fillFront') {
                questions.push({
                    number: index + 1,
                    front: item.back,
                    back: item.front,
                    source: `${poems[currentPoemIndex].title} - ${poems[currentPoemIndex].author}`,
                    poemTitle: poems[currentPoemIndex].title,
                    poemAuthor: poems[currentPoemIndex].author
                });
            } else {
                questions.push({
                    number: index + 1,
                    front: item.front,
                    back: item.back,
                    source: `${poems[currentPoemIndex].title} - ${poems[currentPoemIndex].author}`,
                    poemTitle: poems[currentPoemIndex].title,
                    poemAuthor: poems[currentPoemIndex].author
                });
            }
        });
    }
    
    allQuestions = questions;
    
    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
    currentPage = 0;
    
    const paginationControls = document.getElementById('paginationControls');
    if (totalPages > 1) {
        paginationControls.style.display = 'flex';
        updatePageInfo(totalPages);
    } else {
        paginationControls.style.display = 'none';
    }
    
    // 在标题右边添加"显示所有答案"按钮
    const poemTitle = document.getElementById('poemTitle');
    if (poemTitle && !poemTitle.querySelector('.show-all-answers-btn')) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';
        titleContainer.style.display = 'flex';
        titleContainer.style.alignItems = 'center';
        titleContainer.style.justifyContent = 'space-between';
        titleContainer.style.gap = '15px';
        
        const titleText = poemTitle.textContent;
        poemTitle.textContent = '';
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = titleText;
        titleContainer.appendChild(titleSpan);
        
        const showAllBtn = document.createElement('button');
        showAllBtn.className = 'show-all-answers-btn';
        showAllBtn.onclick = toggleAllAnswers;
        showAllBtn.textContent = '显示所有答案';
        titleContainer.appendChild(showAllBtn);
        
        // 添加字体大小调整控件
        const fontSizeControls = document.createElement('div');
        fontSizeControls.className = 'font-size-controls';
        fontSizeControls.innerHTML = `
            <label>题目字体：</label>
            <input type="range" id="questionFontSize" min="12" max="24" value="16" onchange="adjustFontSize('question', this.value)">
            <span id="questionFontSizeValue">16px</span>
            <label>答案字体：</label>
            <input type="range" id="answerFontSize" min="12" max="24" value="16" onchange="adjustFontSize('answer', this.value)">
            <span id="answerFontSizeValue">16px</span>
        `;
        titleContainer.appendChild(fontSizeControls);
        
        const hideAllBtn = document.createElement('button');
        hideAllBtn.className = 'hide-all-answers-btn';
        hideAllBtn.onclick = hideAllAnswers;
        hideAllBtn.textContent = '一键隐藏答案';
        hideAllBtn.style.display = 'none';
        titleContainer.appendChild(hideAllBtn);
        
        poemTitle.appendChild(titleContainer);
    }
    
    displayCurrentPage();
}

// 创建默认练习
function createDefaultExercise(poem) {
    const questionsContainer = document.getElementById('questionsContainer');
    
    const exerciseTypeSelector = document.createElement('div');
    exerciseTypeSelector.className = 'exercise-type-selector';
    exerciseTypeSelector.innerHTML = `
        <h4>选择练习类型：</h4>
        <div class="exercise-buttons">
            <button class="exercise-btn" onclick="setExerciseType('auto')">自动模式</button>
            <button class="exercise-btn" onclick="setExerciseType('fillFront')">填前句</button>
            <button class="exercise-btn" onclick="setExerciseType('fillBack')">填后句</button>
            <button class="exercise-btn" onclick="setExerciseType('random')">随机抽题</button>
        </div>
    `;
    
    questionsContainer.appendChild(exerciseTypeSelector);
    
    setExerciseType('auto');
}

// 获取练习类型名称
function getExerciseTypeName(type) {
    const typeNames = {
        'auto': '自动模式',
        'fillFront': '填前句',
        'fillBack': '填后句',
        'random': '随机抽题'
    };
    return typeNames[type] || type;
}

// 设置练习类型
function setExerciseType(type) {
    currentExerciseType = type;
    
    document.querySelectorAll('.exercise-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const targetBtn = document.querySelector(`[onclick="setExerciseType('${type}')"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    generateExercise();
}

// 生成练习内容
function generateExercise() {
    const poem = poems[currentPoemIndex];
    const questionsContainer = document.getElementById('questionsContainer');
    
    console.log('生成练习，诗文：', poem.title);
    console.log('练习类型：', currentExerciseType);
    console.log('诗文内容：', poem.content);
    
    const selector = document.querySelector('.exercise-type-selector');
    
    questionsContainer.innerHTML = '';
    
    let questions = [];
    
    if (currentExerciseType === 'auto') {
        const words = poem.content.split('');
        const blankIndices = poem.blanks || [];
        
        blankIndices.forEach((index, i) => {
            questions.push({
                number: i + 1,
                front: words.slice(0, index).join(''),
                back: words[index],
                source: `${poem.title} - ${poem.author}`,
                poemTitle: poem.title,
                poemAuthor: poem.author
            });
        });
        
    } else if (currentExerciseType === 'fillFront') {
        const pairs = splitIntoFrontBackPairs(poem.content);
        console.log('填前句模式，分割后的前后句对：', pairs);
        
        pairs.forEach((pair, index) => {
            questions.push({
                number: index + 1,
                front: pair.back,
                back: pair.front,
                source: `${poem.title} - ${poem.author}`,
                poemTitle: poem.title,
                poemAuthor: poem.author
            });
        });
        
    } else if (currentExerciseType === 'fillBack') {
        const pairs = splitIntoFrontBackPairs(poem.content);
        console.log('填后句模式，分割后的前后句对：', pairs);
        
        pairs.forEach((pair, index) => {
            questions.push({
                number: index + 1,
                front: pair.front,
                back: pair.back,
                source: `${poem.title} - ${poem.author}`,
                poemTitle: poem.title,
                poemAuthor: poem.author
            });
        });
    } else if (currentExerciseType === 'random') {
        // 随机抽题模式：从当前诗文中随机抽取题目
        const randomCount = poem.randomCount || 3; // 默认抽取3题
        const allSentences = [];
        
        // 收集所有可用的句子
        if (poem.sentences) {
            // 如果有预定义的句子，使用它们
            poem.sentences.forEach(sentence => {
                allSentences.push({
                    number: allSentences.length + 1,
                    front: sentence.front,
                    back: sentence.back,
                    source: `${poem.title} - ${poem.author}`,
                    poemTitle: poem.title,
                    poemAuthor: poem.author,
                    id: sentence.id
                });
            });
        } else {
            // 如果没有预定义句子，从内容中生成
            const pairs = splitIntoFrontBackPairs(poem.content);
            pairs.forEach((pair, index) => {
                allSentences.push({
                    number: index + 1,
                    front: pair.front,
                    back: pair.back,
                    source: `${poem.title} - ${poem.author}`,
                    poemTitle: poem.title,
                    poemAuthor: poem.author
                });
            });
        }
        
        // 随机抽取指定数量的题目
        const selectedSentences = selectRandomSentences(allSentences, Math.min(randomCount, allSentences.length));
        questions = selectedSentences;
        
        console.log(`随机抽题模式：从${allSentences.length}题中抽取${questions.length}题`);
    }
    
    console.log('生成的题目：', questions);
    
    allQuestions = questions;
    
    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
    currentPage = 0;
    
    const paginationControls = document.getElementById('paginationControls');
    if (totalPages > 1) {
        paginationControls.style.display = 'flex';
        updatePageInfo(totalPages);
    } else {
        paginationControls.style.display = 'none';
    }
    
    // 在标题右边添加"显示所有答案"按钮
    const poemTitle = document.getElementById('poemTitle');
    if (poemTitle && !poemTitle.querySelector('.show-all-answers-btn')) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';
        titleContainer.style.display = 'flex';
        titleContainer.style.alignItems = 'center';
        titleContainer.style.justifyContent = 'space-between';
        titleContainer.style.gap = '15px';
        
        const titleText = poemTitle.textContent;
        poemTitle.textContent = '';
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = titleText;
        titleContainer.appendChild(titleSpan);
        
        const showAllBtn = document.createElement('button');
        showAllBtn.className = 'show-all-answers-btn';
        showAllBtn.onclick = toggleAllAnswers;
        showAllBtn.textContent = '显示所有答案';
        titleContainer.appendChild(showAllBtn);
        
        // 添加字体大小调整控件
        const fontSizeControls = document.createElement('div');
        fontSizeControls.className = 'font-size-controls';
        fontSizeControls.innerHTML = `
            <label>题目字体：</label>
            <input type="range" id="questionFontSize" min="12" max="24" value="16" onchange="adjustFontSize('question', this.value)">
            <span id="questionFontSizeValue">16px</span>
            <label>答案字体：</label>
            <input type="range" id="answerFontSize" min="12" max="24" value="16" onchange="adjustFontSize('answer', this.value)">
            <span id="answerFontSizeValue">16px</span>
        `;
        titleContainer.appendChild(fontSizeControls);
        
        const hideAllBtn = document.createElement('button');
        hideAllBtn.className = 'hide-all-answers-btn';
        hideAllBtn.onclick = hideAllAnswers;
        hideAllBtn.textContent = '一键隐藏答案';
        hideAllBtn.style.display = 'none';
        titleContainer.appendChild(hideAllBtn);
        
        poemTitle.appendChild(titleContainer);
    }
    
    displayCurrentPage();
}

// 寻找自然的分割点
function findNaturalSplitPoint(sentence) {
    const commaIndex = sentence.indexOf('，');
    const pauseIndex = sentence.indexOf('、');
    
    if (commaIndex !== -1) {
        return commaIndex + 1;
    } else if (pauseIndex !== -1) {
        return pauseIndex + 1;
    } else {
        return Math.floor(sentence.length / 2);
    }
}

// 将整篇文本拆成前后句对
function splitIntoFrontBackPairs(text) {
    const sentences = text.split('。').map(s => s.trim()).filter(Boolean);
    
    const pairs = [];
    
    sentences.forEach(sentence => {
        if (!sentence) return;
        
        const splitPoint = findNaturalSplitPoint(sentence);
        
        const front = sentence.substring(0, splitPoint);
        const back = sentence.substring(splitPoint);
        
        if (front && back) {
            pairs.push({ front, back });
        } else if (front) {
            pairs.push({ front: '', back: front });
        }
    });
    
    console.log('前后句对：', pairs);
    return pairs;
}

// 返回章节选择
function backToChapter() {
    currentChapter = '';
    currentPoemIndex = 0;
    poems = [];
    
    // 隐藏所有页面
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'none';
    document.getElementById('ai-assistant').style.display = 'none';
    
    // 显示章节选择页面
    document.getElementById('chapterSelection').style.display = 'block';
}

// 切换答案显示/隐藏
function toggleAnswer(button, answer) {
    const questionItem = button.closest('.question-item');
    const answerText = questionItem.querySelector('.answer-text');
    if (answerText.style.display === 'none') {
        answerText.style.display = 'block';
        button.textContent = '隐藏答案';
        button.classList.add('active');
    } else {
        answerText.style.display = 'none';
        button.textContent = '显示答案';
        button.classList.remove('active');
    }
}

// 显示所有答案
function toggleAllAnswers() {
    const answerTexts = document.querySelectorAll('.answer-text');
    const showAllBtn = document.querySelector('.show-all-answers-btn');
    const hideAllBtn = document.querySelector('.hide-all-answers-btn');
    
    answerTexts.forEach(answerText => {
        answerText.style.display = 'block';
    });
    
    // 更新所有按钮状态
    document.querySelectorAll('.show-answer-btn').forEach(btn => {
        btn.textContent = '隐藏答案';
        btn.classList.add('active');
    });
    
    showAllBtn.style.display = 'none';
    hideAllBtn.style.display = 'inline-block';
}

// 隐藏所有答案
function hideAllAnswers() {
    const answerTexts = document.querySelectorAll('.answer-text');
    const showAllBtn = document.querySelector('.show-all-answers-btn');
    const hideAllBtn = document.querySelector('.hide-all-answers-btn');
    
    answerTexts.forEach(answerText => {
        answerText.style.display = 'none';
    });
    
    // 更新所有按钮状态
    document.querySelectorAll('.show-answer-btn').forEach(btn => {
        btn.textContent = '显示答案';
        btn.classList.remove('active');
    });
    
    showAllBtn.style.display = 'inline-block';
    hideAllBtn.style.display = 'none';
}

// 切换原文显示/隐藏
function toggleOriginalText(button, source) {
    const questionDiv = button.closest('.question-item');
    const originalTextSection = questionDiv.querySelector('.original-text-section');
    
    if (originalTextSection.style.display === 'none') {
        originalTextSection.style.display = 'block';
        button.textContent = '隐藏原文';
        button.classList.add('active');
    } else {
        originalTextSection.style.display = 'none';
        button.textContent = '显示原文';
        button.classList.remove('active');
    }
}

// 调整字体大小
function adjustFontSize(type, size) {
    const sizeValue = size + 'px';
    
    if (type === 'question') {
        // 调整普通练习的题目字体
        document.querySelectorAll('.question-text').forEach(text => {
            text.style.fontSize = sizeValue;
        });
        // 调整理解性默写的题目字体
        document.querySelectorAll('.comprehensive-question .question-text').forEach(text => {
            text.style.fontSize = sizeValue;
        });
        document.getElementById('questionFontSizeValue').textContent = sizeValue;
    } else if (type === 'answer') {
        // 调整普通练习的答案字体
        document.querySelectorAll('.answer-text, .original-text').forEach(text => {
            text.style.fontSize = sizeValue;
        });
        // 调整理解性默写的答案字体
        document.querySelectorAll('.comprehensive-question .answer-text').forEach(text => {
            text.style.fontSize = sizeValue;
        });
        document.getElementById('answerFontSizeValue').textContent = sizeValue;
    }
}

// 返回诗文选择
function backToPoem() {
    currentPoemIndex = 0;
    
    document.getElementById('recitationPage').style.display = 'none';
    
    // 如果是理解性默写，直接返回章节选择
    if (currentChapter === '理解性默写') {
        document.getElementById('chapterSelection').style.display = 'block';
    } else {
    document.getElementById('poemSelection').style.display = 'block';
    }
}

// 理解性默写相关函数
function displayComprehensiveArticles() {
    console.log('displayComprehensiveArticles 被调用');
    console.log('comprehensiveUtils:', comprehensiveUtils);
    
    const poemList = document.getElementById('poemList');
    poemList.innerHTML = '';

    // 获取所有文章
    const articles = comprehensiveUtils.getAllArticles();
    console.log('获取到的文章:', articles);
    
    // 根据选择模式显示不同的界面
    if (selectionMode === 'single') {
        // 单选模式 - 显示文章列表
        const articlesHtml = articles.map(article => `
            <div class="poem-item" onclick="selectComprehensiveArticle('${article.id}')">
                <h3>${article.title}</h3>
                <div class="poem-meta">
                    <span class="author">${article.dynasty} · ${article.author}</span>
                    <span class="question-count">${article.questions.length}道题</span>
                </div>
            </div>
        `).join('');

        // 添加不定向默写选项
        const flexibleHtml = `
            <div class="poem-item" onclick="selectComprehensiveArticle('flexible')">
                <h3>不定向默写</h3>
                <div class="poem-meta">
                    <span class="author">答案不唯一</span>
                    <span class="question-count">${comprehensiveUtils.getFlexibleQuestions().length}道题</span>
                </div>
            </div>
        `;

        // 添加全部随机选项
        const allRandomHtml = `
            <div class="poem-item" onclick="selectComprehensiveArticle('all')">
                <h3>全部随机</h3>
                <div class="poem-meta">
                    <span class="author">所有文章题目</span>
                    <span class="question-count">随机出题</span>
                </div>
            </div>
        `;

        poemList.innerHTML = articlesHtml + flexibleHtml + allRandomHtml;
    } else {
        // 多选模式 - 显示带复选框的文章列表
        const articlesHtml = articles.map((article, index) => `
            <div class="poem-item multi-select-item" onclick="toggleComprehensiveArticleSelection('${article.id}', ${index})">
                <div class="poem-checkbox">
                    <input type="checkbox" id="comprehensive_${article.id}" ${selectedPoems.includes(article.id) ? 'checked' : ''}>
                </div>
                <h3>${article.title}</h3>
                <div class="poem-meta">
                    <span class="author">${article.dynasty} · ${article.author}</span>
                    <span class="question-count">${article.questions.length}道题</span>
                </div>
            </div>
        `).join('');

        // 添加不定向默写选项
        const flexibleHtml = `
            <div class="poem-item multi-select-item" onclick="toggleComprehensiveArticleSelection('flexible', -1)">
                <div class="poem-checkbox">
                    <input type="checkbox" id="comprehensive_flexible" ${selectedPoems.includes('flexible') ? 'checked' : ''}>
                </div>
                <h3>不定向默写</h3>
                <div class="poem-meta">
                    <span class="author">答案不唯一</span>
                    <span class="question-count">${comprehensiveUtils.getFlexibleQuestions().length}道题</span>
                </div>
            </div>
        `;

        poemList.innerHTML = articlesHtml + flexibleHtml;
    }

    // 显示多选控件（如果存在）
    const selectionControls = document.getElementById('selectionControls');
    if (selectionControls) {
        selectionControls.style.display = 'block';
    }
    updateActionButtons();
}

function selectComprehensiveArticle(articleId) {
    if (articleId === 'all') {
        // 全部随机
        const allQuestions = [];
        const articles = comprehensiveUtils.getAllArticles();
        articles.forEach(article => {
            allQuestions.push(...article.questions);
        });
        allQuestions.push(...comprehensiveUtils.getFlexibleQuestions());
        
        document.getElementById('poemSelection').style.display = 'none';
        document.getElementById('recitationPage').style.display = 'block';
        document.getElementById('poemTitle').textContent = '理解性默写 - 全部随机';
        displayComprehensiveQuestions(allQuestions);
    } else if (articleId === 'flexible') {
        // 不定向默写
        const flexibleQuestions = comprehensiveUtils.getFlexibleQuestions();
        document.getElementById('poemSelection').style.display = 'none';
        document.getElementById('recitationPage').style.display = 'block';
        document.getElementById('poemTitle').textContent = '理解性默写 - 不定向默写';
        displayComprehensiveQuestions(flexibleQuestions);
    } else {
        // 特定文章
        const article = comprehensiveUtils.getArticleById(articleId);
        if (article) {
            document.getElementById('poemSelection').style.display = 'none';
            document.getElementById('recitationPage').style.display = 'block';
            document.getElementById('poemTitle').textContent = `理解性默写 - ${article.title}`;
            displayComprehensiveQuestions(article.questions);
        }
    }
}

function displayComprehensiveQuestions(questions) {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    // 为理解性默写添加字体大小调整控件到标题栏
    const poemTitle = document.getElementById('poemTitle');
    if (poemTitle) {
        // 如果已经存在字体调整控件，先移除
        const existingControls = poemTitle.querySelector('.font-size-controls');
        if (existingControls) {
            existingControls.remove();
        }
        
        // 检查是否已经有title-container
        let titleContainer = poemTitle.querySelector('.title-container');
        if (!titleContainer) {
            titleContainer = document.createElement('div');
            titleContainer.className = 'title-container';
            titleContainer.style.display = 'flex';
            titleContainer.style.alignItems = 'center';
            titleContainer.style.justifyContent = 'space-between';
            titleContainer.style.gap = '15px';
            
            const titleText = poemTitle.textContent;
            poemTitle.textContent = '';
            
            const titleSpan = document.createElement('span');
            titleSpan.textContent = titleText;
            titleContainer.appendChild(titleSpan);
            
            poemTitle.appendChild(titleContainer);
        }
        
        // 创建右侧控制区域，包含按钮和字体调整
        const rightControls = document.createElement('div');
        rightControls.style.display = 'flex';
        rightControls.style.alignItems = 'center';
        rightControls.style.gap = '15px';
        rightControls.style.flexWrap = 'wrap';
        
        // 添加控制按钮
        const controlButtons = document.createElement('div');
        controlButtons.className = 'comprehensive-controls';
        controlButtons.style.display = 'flex';
        controlButtons.style.gap = '6px';
        controlButtons.style.alignItems = 'center';
        
        controlButtons.innerHTML = `
            <button class="shuffle-btn" onclick="shuffleComprehensiveQuestions()">🔀 打乱顺序</button>
            <button class="show-all-btn" onclick="showAllComprehensiveAnswers()">👁️ 显示所有答案</button>
            <button class="hide-all-btn" onclick="hideAllComprehensiveAnswers()">🙈 隐藏所有答案</button>
        `;
        rightControls.appendChild(controlButtons);
        
        // 添加字体大小调整控件
        const fontSizeControls = document.createElement('div');
        fontSizeControls.className = 'font-size-controls';
        fontSizeControls.style.display = 'flex';
        fontSizeControls.style.alignItems = 'center';
        fontSizeControls.style.gap = '6px';
        fontSizeControls.style.flexWrap = 'wrap';
        fontSizeControls.innerHTML = `
            <label>题目字体：</label>
            <input type="range" id="questionFontSize" min="12" max="24" value="16" onchange="adjustFontSize('question', this.value)">
            <span id="questionFontSizeValue">16px</span>
            <label>答案字体：</label>
            <input type="range" id="answerFontSize" min="12" max="24" value="16" onchange="adjustFontSize('answer', this.value)">
            <span id="answerFontSizeValue">16px</span>
        `;
        rightControls.appendChild(fontSizeControls);
        
        titleContainer.appendChild(rightControls);
    }

    // 清空题目容器，不再需要单独的控制按钮区域
    questionsContainer.innerHTML = '';

    // 存储当前题目到全局变量
    window.currentComprehensiveQuestions = questions;

    // 题目列表
    const questionsHtml = questions.map((question, index) => `
        <div class="comprehensive-question" data-id="${question.id}">
            <div class="question-header">
                <h3>${question.title || '题目 ' + (index + 1)}</h3>
                <div class="question-meta">
                    <span class="source">${question.source || ''}</span>
                    <span class="exam-info">${question.year || ''} ${question.exam || ''}</span>
                </div>
            </div>
            <div class="question-text">${question.question}</div>
            <button class="show-answer-btn" onclick="toggleComprehensiveAnswer(this)">显示答案</button>
            <div class="answer-text" style="display: none;">${question.answer}</div>
        </div>
    `).join('');

    questionsContainer.innerHTML += questionsHtml;
}

// 打乱理解性默写题目
function shuffleComprehensiveQuestions() {
    if (!window.currentComprehensiveQuestions) return;
    
    const questionsContainer = document.getElementById('questionsContainer');
    
    // 打乱当前题目
    const shuffledQuestions = comprehensiveUtils.shuffleQuestions(window.currentComprehensiveQuestions);
    
    // 重新显示打乱后的题目
    const questionsHtml = shuffledQuestions.map((question, index) => `
        <div class="comprehensive-question" data-id="${question.id}">
            <div class="question-header">
                <h3>${question.title || '题目 ' + (index + 1)}</h3>
                <div class="question-meta">
                    <span class="source">${question.source || ''}</span>
                    <span class="exam-info">${question.year || ''} ${question.exam || ''}</span>
                </div>
            </div>
            <div class="question-text">${question.question}</div>
            <button class="show-answer-btn" onclick="toggleComprehensiveAnswer(this)">显示答案</button>
            <div class="answer-text" style="display: none;">${question.answer}</div>
        </div>
    `).join('');

    questionsContainer.innerHTML = questionsHtml;
}

// 切换理解性默写答案显示/隐藏
function toggleComprehensiveAnswer(button) {
    const answerText = button.nextElementSibling;
    if (answerText.style.display === 'none') {
        answerText.style.display = 'block';
        button.textContent = '隐藏答案';
        button.classList.add('active');
    } else {
        answerText.style.display = 'none';
        button.textContent = '显示答案';
        button.classList.remove('active');
    }
}

// 显示所有理解性默写答案
function showAllComprehensiveAnswers() {
    document.querySelectorAll('.comprehensive-question .answer-text').forEach(answer => {
        answer.style.display = 'block';
    });
    document.querySelectorAll('.comprehensive-question .show-answer-btn').forEach(btn => {
        btn.textContent = '隐藏答案';
        btn.classList.add('active');
    });
}

// 隐藏所有理解性默写答案
function hideAllComprehensiveAnswers() {
    document.querySelectorAll('.comprehensive-question .answer-text').forEach(answer => {
        answer.style.display = 'none';
    });
    document.querySelectorAll('.comprehensive-question .show-answer-btn').forEach(btn => {
        btn.textContent = '显示答案';
        btn.classList.remove('active');
    });
}

// 开始理解性默写多选练习
function startComprehensiveMultiExercise() {
    if (selectedPoems.length === 0) {
        alert('请至少选择一篇古诗文！');
        return;
    }
    
    const exerciseMode = document.querySelector('input[name="exerciseMode"]:checked').value;
    
    if (exerciseMode === 'complete') {
        startComprehensiveCompleteExercise();
    } else {
        startComprehensiveRandomExercise();
    }
}

// 开始理解性默写完整题目练习
function startComprehensiveCompleteExercise() {
    const allQuestions = [];
    
    selectedPoems.forEach(articleId => {
        if (articleId === 'flexible') {
            // 添加不定向默写题目
            const flexibleQuestions = comprehensiveUtils.getFlexibleQuestions();
            allQuestions.push(...flexibleQuestions);
        } else {
            // 添加特定文章的题目
            const article = comprehensiveUtils.getArticleById(articleId);
            if (article) {
                allQuestions.push(...article.questions);
            }
        }
    });
    
    currentExerciseConfig = {
        type: 'comprehensiveComplete',
        title: `理解性默写 - 多篇完整练习 (${selectedPoems.length}篇)`,
        description: '所有选中文章的完整练习',
        items: allQuestions,
        currentIndex: 0
    };
    
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'block';
    document.getElementById('poemTitle').textContent = currentExerciseConfig.title;
    
    displayComprehensiveMultiExercise();
}

// 开始理解性默写随机练习
function startComprehensiveRandomExercise() {
    const totalQuestions = parseInt(document.getElementById('totalQuestions').value) || 10;
    
    const allQuestions = [];
    
    selectedPoems.forEach(articleId => {
        if (articleId === 'flexible') {
            // 添加不定向默写题目
            const flexibleQuestions = comprehensiveUtils.getFlexibleQuestions();
            allQuestions.push(...flexibleQuestions);
        } else {
            // 添加特定文章的题目
            const article = comprehensiveUtils.getArticleById(articleId);
            if (article) {
                allQuestions.push(...article.questions);
            }
        }
    });
    
    const selectedQuestions = comprehensiveUtils.getRandomQuestions(allQuestions, totalQuestions);
    
    currentExerciseConfig = {
        type: 'comprehensiveRandom',
        title: `理解性默写 - 随机练习 (${totalQuestions}题)`,
        description: `从${selectedPoems.length}篇文章中随机抽取${totalQuestions}题`,
        items: selectedQuestions,
        currentIndex: 0
    };
    
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'block';
    document.getElementById('poemTitle').textContent = currentExerciseConfig.title;
    
    displayComprehensiveMultiExercise();
}

// 显示理解性默写多选练习
function displayComprehensiveMultiExercise() {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    if (!currentExerciseConfig || currentExerciseConfig.items.length === 0) {
        questionsContainer.innerHTML = '<p>没有可用的练习题目</p>';
        return;
    }

    // 为理解性默写添加字体大小调整控件到标题栏
    const poemTitle = document.getElementById('poemTitle');
    if (poemTitle) {
        // 如果已经存在字体调整控件，先移除
        const existingControls = poemTitle.querySelector('.font-size-controls');
        if (existingControls) {
            existingControls.remove();
        }
        
        // 检查是否已经有title-container
        let titleContainer = poemTitle.querySelector('.title-container');
        if (!titleContainer) {
            titleContainer = document.createElement('div');
            titleContainer.className = 'title-container';
            titleContainer.style.display = 'flex';
            titleContainer.style.alignItems = 'center';
            titleContainer.style.justifyContent = 'space-between';
            titleContainer.style.gap = '15px';
            
            const titleText = poemTitle.textContent;
            poemTitle.textContent = '';
            
            const titleSpan = document.createElement('span');
            titleSpan.textContent = titleText;
            titleContainer.appendChild(titleSpan);
            
            poemTitle.appendChild(titleContainer);
        }
        
        // 创建右侧控制区域，包含按钮和字体调整
        const rightControls = document.createElement('div');
        rightControls.style.display = 'flex';
        rightControls.style.alignItems = 'center';
        rightControls.style.gap = '15px';
        rightControls.style.flexWrap = 'wrap';
        
        // 添加控制按钮
        const controlButtons = document.createElement('div');
        controlButtons.className = 'comprehensive-controls';
        controlButtons.style.display = 'flex';
        controlButtons.style.gap = '6px';
        controlButtons.style.alignItems = 'center';
        
        controlButtons.innerHTML = `
            <button class="shuffle-btn" onclick="shuffleComprehensiveQuestions()">🔀 打乱顺序</button>
            <button class="show-all-btn" onclick="showAllComprehensiveAnswers()">👁️ 显示所有答案</button>
            <button class="hide-all-btn" onclick="hideAllComprehensiveAnswers()">🙈 隐藏所有答案</button>
        `;
        rightControls.appendChild(controlButtons);
        
        // 添加字体大小调整控件
        const fontSizeControls = document.createElement('div');
        fontSizeControls.className = 'font-size-controls';
        fontSizeControls.style.display = 'flex';
        fontSizeControls.style.alignItems = 'center';
        fontSizeControls.style.gap = '6px';
        fontSizeControls.style.flexWrap = 'wrap';
        fontSizeControls.innerHTML = `
            <label>题目字体：</label>
            <input type="range" id="questionFontSize" min="12" max="24" value="16" onchange="adjustFontSize('question', this.value)">
            <span id="questionFontSizeValue">16px</span>
            <label>答案字体：</label>
            <input type="range" id="answerFontSize" min="12" max="24" value="16" onchange="adjustFontSize('answer', this.value)">
            <span id="answerFontSizeValue">16px</span>
        `;
        rightControls.appendChild(fontSizeControls);
        
        titleContainer.appendChild(rightControls);
    }

    // 存储当前题目到全局变量
    window.currentComprehensiveQuestions = currentExerciseConfig.items;

    // 题目列表
    const questionsHtml = currentExerciseConfig.items.map((question, index) => `
        <div class="comprehensive-question" data-id="${question.id}">
            <div class="question-header">
                <h3>题目 ${index + 1}</h3>
                <div class="question-meta">
                    <span class="source">${question.source || ''}</span>
                    <span class="exam-info">${question.year || ''} ${question.exam || ''}</span>
                </div>
            </div>
            <div class="question-text">${question.question}</div>
            <div class="answer-section">
                <button class="show-answer-btn" onclick="toggleComprehensiveAnswer(this)">显示答案</button>
                <div class="answer-text" style="display: none;">${question.answer}</div>
            </div>
        </div>
    `).join('');

    questionsContainer.innerHTML = questionsHtml;
}

// 重新打乱多篇练习的题目顺序
function reshuffleQuestions() {
    if (!currentExerciseConfig || !currentExerciseConfig.items || currentExerciseConfig.items.length === 0) {
        return;
    }
    
    // 重新打乱题目顺序
    const shuffledItems = shuffleArray([...currentExerciseConfig.items]);
    currentExerciseConfig.items = shuffledItems;
    allQuestions = shuffledItems;
    
    // 重置到第一页
    currentPage = 0;
    
    // 更新页码信息
    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
    updatePageInfo(totalPages);
    
    // 重新显示当前页
    displayCurrentPage();
}


