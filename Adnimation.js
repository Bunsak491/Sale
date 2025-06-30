        document.addEventListener('DOMContentLoaded', function() {
            // Sample video data (simulating a database)
            let videos = [
                {
                    id: 1,
                    title: "Amazing Travel Vlog",
                    description: "A beautiful journey through the mountains and beaches.",
                    category: "travel",
                    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                    thumbnail: "https://picsum.photos/seed/video1/320/180.jpg",
                    uploader: "TravelEnthusiast",
                    uploaderAvatar: "https://picsum.photos/seed/user1/40/40.jpg",
                    views: 1245,
                    date: "2023-05-15"
                },
                {
                    id: 2,
                    title: "Cooking Tutorial: Italian Pasta",
                    description: "Learn how to make authentic Italian pasta from scratch.",
                    category: "food",
                    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    thumbnail: "https://picsum.photos/seed/video2/320/180.jpg",
                    uploader: "ChefMaria",
                    uploaderAvatar: "https://picsum.photos/seed/user2/40/40.jpg",
                    views: 876,
                    date: "2023-06-02"
                },
                {
                    id: 3,
                    title: "Guitar Cover: Popular Song",
                    description: "My guitar cover of a popular song that I've been practicing.",
                    category: "music",
                    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                    thumbnail: "https://picsum.photos/seed/video3/320/180.jpg",
                    uploader: "MusicLover",
                    uploaderAvatar: "https://picsum.photos/seed/user3/40/40.jpg",
                    views: 2341,
                    date: "2023-06-10"
                },
                 {
                    id: 4,
                    title: "Guitar Cover: Popular Song",
                    description: "My guitar cover of a popular song that I've been practicing.",
                    category: "music",
                    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                    thumbnail: "https://picsum.photos/seed/video3/320/180.jpg",
                    uploader: "MusicLover",
                    uploaderAvatar: "https://picsum.photos/seed/user3/40/40.jpg",
                    views: 2341,
                    date: "2023-06-10"
                },
                 {
                    id: 5,
                    title: "Guitar Cover: Popular Song",
                    description: "My guitar cover of a popular song that I've been practicing.",
                    category: "music",
                    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                    thumbnail: "https://picsum.photos/seed/video3/320/180.jpg",
                    uploader: "MusicLover",
                    uploaderAvatar: "https://picsum.photos/seed/user3/40/40.jpg",
                    views: 2341,
                    date: "2023-06-10"
                }

            ];
            
            // DOM Elements
            const videoGallery = document.getElementById('videoGallery');
            const emptyState = document.getElementById('emptyState');
            const dropArea = document.getElementById('dropArea');
            const browseButton = document.getElementById('browseButton');
            const videoFileInput = document.getElementById('videoFile');
            const fileInfo = document.getElementById('fileInfo');
            const fileName = document.getElementById('fileName');
            const removeFileBtn = document.getElementById('removeFile');
            const uploadProgress = document.getElementById('uploadProgress');
            const submitUploadBtn = document.getElementById('submitUpload');
            const successToast = document.getElementById('successToast');
            const errorToast = document.getElementById('errorToast');
            const successToastMessage = document.getElementById('successToastMessage');
            const errorToastMessage = document.getElementById('errorToastMessage');
            const confirmDeleteBtn = document.getElementById('confirmDelete');
            const videoPlayer = document.getElementById('videoPlayer');
            const videoPlayerTitle = document.getElementById('videoPlayerTitle');
            const videoPlayerViews = document.getElementById('videoPlayerViews');
            
            let currentVideoId = null;
            let selectedFile = null;
            
            // Initialize Bootstrap toasts
            const toastOptions = {
                animation: true,
                autohide: true,
                delay: 3000
            };
            const successToastObj = new bootstrap.Toast(successToast, toastOptions);
            const errorToastObj = new bootstrap.Toast(errorToast, toastOptions);
            
            // Initialize Bootstrap modals
            const uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
            const videoPlayerModal = new bootstrap.Modal(document.getElementById('videoPlayerModal'));
            const deleteConfirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
            
            // Function to show success toast
            function showSuccessToast(message) {
                successToastMessage.textContent = message;
                successToastObj.show();
            }
            
            // Function to show error toast
            function showErrorToast(message) {
                errorToastMessage.textContent = message;
                errorToastObj.show();
            }
            
            // Function to render video gallery
            function renderVideoGallery() {
                // Clear gallery except empty state
                const videoCards = videoGallery.querySelectorAll('.video-card-col');
                videoCards.forEach(card => card.remove());
                
                // Show or hide empty state
                if (videos.length === 0) {
                    emptyState.classList.remove('d-none');
                } else {
                    emptyState.classList.add('d-none');
                    
                    // Add video cards
                    videos.forEach(video => {
                        const videoCard = document.createElement('div');
                        videoCard.className = 'col-md-6 col-lg-4 video-card-col mb-4';
                        videoCard.innerHTML = `
                            <div class="card h-100">
                                <div class="position-relative">
                                    <div class="video-container">
                                        <video src="${video.url}" poster="${video.thumbnail}" class="video-thumbnail"></video>
                                    </div>
                                    <div class="video-actions">
                                        <button class="play-btn" data-video-id="${video.id}" title="Play">
                                            <i class="fas fa-play"></i>
                                        </button>
                                        <button class="delete-btn" data-video-id="${video.id}" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">${video.title}</h5>
                                    <p class="card-text text-muted">${video.description}</p>
                                    <div class="d-flex align-items-center mt-3">
                                        <img src="${video.uploaderAvatar}" class="rounded-circle me-2" alt="${video.uploader}">
                                        <span>${video.uploader}</span>
                                        <span class="ms-auto text-muted"><i class="fas fa-eye me-1"></i> ${video.views} views</span>
                                    </div>
                                </div>
                            </div>
                        `;
                        videoGallery.appendChild(videoCard);
                    });
                }
            }
            
            // Initialize gallery
            renderVideoGallery();
            
            // File upload area event listeners
            dropArea.addEventListener('click', () => {
                videoFileInput.click();
            });
            
            browseButton.addEventListener('click', (e) => {
                e.preventDefault();
                videoFileInput.click();
            });
            
            videoFileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    selectedFile = e.target.files[0];
                    fileName.textContent = selectedFile.name;
                    fileInfo.classList.remove('d-none');
                    dropArea.classList.add('d-none');
                }
            });
            
            removeFileBtn.addEventListener('click', () => {
                selectedFile = null;
                videoFileInput.value = '';
                fileInfo.classList.add('d-none');
                dropArea.classList.remove('d-none');
            });
            
            // Drag and drop functionality
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            ['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, highlight, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, unhighlight, false);
            });
            
            function highlight() {
                dropArea.style.borderColor = '#e50914';
                dropArea.style.backgroundColor = 'rgba(229, 9, 20, 0.1)';
            }
            
            function unhighlight() {
                dropArea.style.borderColor = '#6c757d';
                dropArea.style.backgroundColor = '';
            }
            
            dropArea.addEventListener('drop', handleDrop, false);
            
            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                
                if (files.length > 0) {
                    selectedFile = files[0];
                    if (selectedFile.type.startsWith('video/')) {
                        fileName.textContent = selectedFile.name;
                        fileInfo.classList.remove('d-none');
                        dropArea.classList.add('d-none');
                    } else {
                        showErrorToast('Please select a valid video file.');
                    }
                }
            }
            
            // Submit upload button
            submitUploadBtn.addEventListener('click', () => {
                // Get active tab
                const activeTab = document.querySelector('#uploadTabs .nav-link.active');
                let title, description, category, videoUrl;
                
                if (activeTab.id === 'file-tab') {
                    // File upload tab
                    title = document.getElementById('videoTitle').value;
                    description = document.getElementById('videoDescription').value;
                    category = document.getElementById('videoCategory').value;
                    
                    if (!title) {
                        showErrorToast('Please enter a video title.');
                        return;
                    }
                    
                    if (!selectedFile) {
                        showErrorToast('Please select a video file.');
                        return;
                    }
                    
                    // Simulate upload progress
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += 10;
                        uploadProgress.style.width = `${progress}%`;
                        
                        if (progress >= 100) {
                            clearInterval(interval);
                            
                            // Add new video to the list
                            const newVideo = {
                                id: videos.length + 1,
                                title: title,
                                description: description,
                                category: category,
                                url: URL.createObjectURL(selectedFile),
                                thumbnail: `https://picsum.photos/seed/video${videos.length + 1}/320/180.jpg`,
                                uploader: "You",
                                uploaderAvatar: "https://picsum.photos/seed/currentuser/40/40.jpg",
                                views: 0,
                                date: new Date().toISOString().split('T')[0]
                            };
                            
                            videos.unshift(newVideo);
                            renderVideoGallery();
                            
                            // Reset form
                            document.getElementById('fileUploadForm').reset();
                            fileInfo.classList.add('d-none');
                            dropArea.classList.remove('d-none');
                            uploadProgress.style.width = '0%';
                            selectedFile = null;
                            
                            // Close modal and show success message
                            uploadModal.hide();
                            showSuccessToast('Video uploaded successfully!');
                        }
                    }, 200);
                    
                } else {
                    // URL upload tab
                    title = document.getElementById('urlVideoTitle').value;
                    description = document.getElementById('urlVideoDescription').value;
                    category = document.getElementById('urlVideoCategory').value;
                    videoUrl = document.getElementById('videoUrl').value;
                    
                    if (!title) {
                        showErrorToast('Please enter a video title.');
                        return;
                    }
                    
                    if (!videoUrl) {
                        showErrorToast('Please enter a video URL.');
                        return;
                    }
                    
                    // Add new video from URL
                    const newVideo = {
                        id: videos.length + 1,
                        title: title,
                        description: description,
                        category: category,
                        url: videoUrl,
                        thumbnail: `https://picsum.photos/seed/video${videos.length + 1}/320/180.jpg`,
                        uploader: "You",
                        uploaderAvatar: "https://picsum.photos/seed/currentuser/40/40.jpg",
                        views: 0,
                        date: new Date().toISOString().split('T')[0]
                    };
                    
                    videos.unshift(newVideo);
                    renderVideoGallery();
                    
                    // Reset form
                    document.getElementById('urlUploadForm').reset();
                    
                    // Close modal and show success message
                    uploadModal.hide();
                    showSuccessToast('Video added successfully!');
                }
            });
            
            // Video gallery event delegation
            videoGallery.addEventListener('click', (e) => {
                // Play button
                if (e.target.closest('.play-btn')) {
                    const btn = e.target.closest('.play-btn');
                    const videoId = parseInt(btn.dataset.videoId);
                    const video = videos.find(v => v.id === videoId);
                    
                    if (video) {
                        videoPlayer.src = video.url;
                        videoPlayerTitle.textContent = video.title;
                        videoPlayerViews.innerHTML = `<i class="fas fa-eye me-1"></i> ${video.views} views`;
                        videoPlayerModal.show();
                        
                        // Increment view count
                        video.views++;
                        renderVideoGallery();
                    }
                }
                
                // Delete button
                if (e.target.closest('.delete-btn')) {
                    const btn = e.target.closest('.delete-btn');
                    currentVideoId = parseInt(btn.dataset.videoId);
                    deleteConfirmModal.show();
                }
            });
            
            // Confirm delete button
            confirmDeleteBtn.addEventListener('click', () => {
                if (currentVideoId) {
                    videos = videos.filter(video => video.id !== currentVideoId);
                    renderVideoGallery();
                    deleteConfirmModal.hide();
                    showSuccessToast('Video deleted successfully!');
                    currentVideoId = null;
                }
            });
            
            // Video player events
            videoPlayer.addEventListener('play', () => {
                videoPlayer.setAttribute('controls', 'controls');
            });
            
            videoPlayer.addEventListener('ended', () => {
                videoPlayer.removeAttribute('controls');
            });
            
            // Close modal when clicking outside video player
            videoPlayerModal.addEventListener('click', (e) => {
                if (e.target === videoPlayerModal._element) {
                    videoPlayerModal.hide();
                }
            });
        });
