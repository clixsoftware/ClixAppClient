<form>
    <div class="ui message-form content form segment">
        <div class="ui active basic tab segment" data-tab="first">
            <div class="message-content-body">
                <div class="field">
                    <input placeholder="Headline" type="text" id="post_title"
                           name="title" class="no-border">
                </div>

                <div class="field">
                    <textarea class="no-border" id="post_content" name="content"
                              placeholder="Type your content here"></textarea>
                </div>
            </div>
        </div>
        <div class="ui tab segment" data-tab="second">
            <div class="ui two column grid">
                <div class="column">
                    <div class="ui basic segment">
                        <div class="date field">
                            <label>Start Date (optional)</label>
                            <input type="text" placeholder="xx/xx/xxxx" name="start_date"
                                   id="post_start_date" data-role="datepicker">
                        </div>
                        <div class="date field">
                            <label>End Date (optional)</label>
                            <input type="text" placeholder="xx/xx/xxxx"
                                   name="expiry_date" id="post_expiry_date">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="ui basic segment">
                        <div class="field">
                            <label>Publish Category</label>
                            <input type="text" placeholder="Sports" name="category"
                                   id="post_category">
                        </div>
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="is_featured"
                                   id="post_is_featured">
                            <label>Set article has Featured</label>
                        </div>
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="show_on)homepage"
                                   id="post_is_featured">
                            <label>Show on homepage</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui tab segment" data-tab="third">
            <div class="field">
                <label>Cover image</label>
                <input type="text" placeholder="/assets/images/headlineimage.jpg"
                       name="cover_image"
                       id="post_cover_image">
            </div>
            <div class="field">
                <label>Thumbnail</label>
                <input type="text" placeholder="/assets/images/thumbnail.jpg"
                       name="thumbnail" id="post_thumbnail">
            </div>
        </div>
        <div class="ui tab segment" data-tab="fourth">
            <div class="ui two column grid">
                <div class="column">
                    <div class="ui basic segment">
                        <div class="field">
                            <label>Short Headline</label>
                            <input type="text" placeholder="Publish link"
                                   name="short_title"
                                   id="post_short_title">
                        </div>
                        <div class="field">
                            <label>Tags</label>
                            <input type="text" placeholder="e.g. nursing"
                                   name="tags" id="post_tags">
                        </div>


                    </div>
                </div>
                <div class="column">
                    <div class="ui basic segment">
                        <div class="field">
                            <label>Article Summary</label>
                            <textarea id="post_description" name="description"
                                      placeholder="Summary of the post"></textarea>
                        </div>


                    </div>
                </div>

            </div>
        </div>


    </div>


    <div class="actions">
        <div class="ui buttons">
            <div class="ui blue button js-submit">Post this article</div>
            <div class="or"></div>
            <div class="ui  basic button js-cancel">Cancel</div>


        </div>
    </div>
</form>
