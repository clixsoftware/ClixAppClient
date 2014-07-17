<div class="ui two column relaxed grid">
    <div class="column">
        <h4 class="ui top attached header">
            General Settings
        </h4>

        <div class="ui segment selection list attached">
            <a class="item">
                <div class="ui red horizontal label">Title</div>
                <%=obj.title%>
            </a>
            <a class="item">
                <div class="ui purple horizontal label">Url</div>
                <%=obj.url%>
            </a>
            <a class="item">
                <div class="ui purple horizontal label">Alias</div>
                <%=obj.alias%>
            </a>
            <a class="item">
                <div class="ui purple horizontal label">Work Unit</div>
                <%=obj.work_unit%>
            </a>
            <a class="item">
                <div class="ui purple horizontal label">Owner</div>
                <%=obj.ownedby_user_id%>
            </a>
            <a class="item">
                <div class="ui purple horizontal label">Status</div>
                <%=obj.status%>
            </a>

            <a class="item">
                <div class="ui purple horizontal label">Start Page</div>
                --
            </a>

            <a class="item">
                <div class="ui red horizontal label">Description</div>
                <div class="ui segment">
                    <%=obj.description%>
                </div>
            </a>

        </div>
    </div>
    <div class="column">
        <h4 class="ui top attached header">
            Site Announcements
        </h4>

        <div class="ui segment selection list attached">
            <a class="item">
                <div class="ui red horizontal label">Announcement</div>
                No announcement provided
            </a>
            <a class="item">
                <div class="ui purple horizontal label">Enabled</div>
                Announcement is off
            </a>
        </div>

        <h4 class="ui top attached header">
            Site Features
        </h4>

        <div class="ui segment attached">
            <div class="ui two column grid">
                <div class="column">
                    <div class="ui secondary vertical menu">
                        <a class="item">
                            <div class="ui toggle checkbox">
                                <input type="checkbox"
                                       name="has_calendar" <% if(has_calendar){ %>
                                checked
                                <% } %>
                                data-app="calendarmanager">
                                <label>Calendar</label>
                            </div>

                        </a>
                        <a class="item">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" name="has_news"
                                <% if(has_news){ %>
                                checked
                                <% } %>
                                data-app="newsmanager">
                                <label>News</label>
                            </div>

                        </a>
                        <a class="item">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" name="pet">
                                <label>Blog</label>
                            </div>

                        </a>
                        <a class="item">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" name="pet">
                                <label>Pages</label>
                            </div>

                        </a>
                        <a class="item">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" name="pet">
                                <label>Content</label>
                            </div>

                        </a>
                        <a class="item">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" name="pet">
                                <label>Video</label>
                            </div>

                        </a>


                    </div>
                </div>
                <div class="column">
                    <div class="ui secondary vertical menu">
                        <a class="item">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" name="pet">
                                <label>Image</label>
                            </div>

                        </a>
                        <a class="item">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" name="pet">
                                <label>Documents</label>
                            </div>

                        </a>


                    </div>
                </div>

            </div>

        </div>

    </div>
</div>

