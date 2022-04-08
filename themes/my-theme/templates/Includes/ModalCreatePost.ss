<%-- Modals Add Post --%>
<div class="modal fade" id="AddPost" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="addPostLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered justify-content-center" style="transition: all 0.5s;">
        <div class="modal-content border-0" style="max-width: 390px;" id="modal-addPost">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title col" id="addPostLabel">Create new post</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex align-items-center flex-column justify-content-center overflow-hidden"
                style="min-height: 388px;">
                <div class="text-center">
                    <i class="bi bi-images" style="font-size: 96px;line-height: 94px;"></i>
                </div>
                <form class="formUploadImage my-4" enctype="multipart/form-data">
                    <label for="uploadImage" class="btn btn-primary" role="button">Select from
                        computer</label>
                    <input class="form-control visually-hidden uploadImage" type="file" id="uploadImage"
                        name="uploadImage">
                </form>
            </div>
            <div class="modal-footer p-0"></div>
        </div>
    </div>
</div>