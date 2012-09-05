class LosersController < ApplicationController
  def index
    @users = User.all
    logger.info(@user.to_yaml)

    respond_to do |format|
      format.html # index.html.haml
      format.json { render json: @users}
    end
  end
  
  def show
    @post = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
  end
end