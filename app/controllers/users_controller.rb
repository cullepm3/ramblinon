class UsersController < ApplicationController
  # GET /users
  # GET /posts.json
  def index
    @users = User.all
    logger.info(@users.to_yaml)

    respond_to do |format|
      format.html # index.html.haml
      format.json { render json: @users }
    end
  end

  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
  end

  def edit
    logger.info(params)
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    logger.info(params.to_yaml)

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

end
