class UserTeamsController < ApplicationController
  include ApplicationHelper 
  
  # GET /user_teams
  # GET /user_teams.json
  def index
    @user_teams = UserTeam.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @user_teams }
    end
  end

  # GET /user_teams/1
  # GET /user_teams/1.json
  def show
    @user_team = UserTeam.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user_team }
    end
  end

  # GET /user_teams/new
  # GET /user_teams/new.json
  def new
    @user_team = UserTeam.new
    @user_team.year=2012
    @users= User.all

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user_team }
    end
  end

  # GET /user_teams/1/edit
  def edit
    logger.info(params)
    @user_team = UserTeam.find(params[:id])
        
    @users= User.all
  end

  # POST /user_teams
  # POST /user_teams.json
  def create
    @user_team = UserTeam.new(params[:user_team])    
    
    respond_to do |format|
      if @user_team.save
        format.html { redirect_to @user_team, notice: 'User team was successfully created.' }
        format.json { render json: @user_team, status: :created, location: @user_team }
      else
        format.html { render action: "new" }
        format.json { render json: @user_team.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /user_teams/1
  # PUT /user_teams/1.json
  def update
    @user_team = UserTeam.find(params[:id])

    logger.info(params.to_yaml)

    respond_to do |format|
      if @user_team.update_attributes(params[:user_team])
        format.html { redirect_to @user_team, notice: 'User team was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user_team.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_teams/1
  # DELETE /user_teams/1.json
  def destroy
    @user_team = UserTeam.find(params[:id])
    @user_team.destroy

    respond_to do |format|
      format.html { redirect_to user_teams_url }
      format.json { head :no_content }
    end  
  end
  
  def remaining
    @user_teams= UserTeam.all
  end
  
  def bracket
    if (params[:region])
      @region= set_bracket(Team.where(:region => params[:region]))
    else 
      @west= set_bracket(Team.where(:region => "West"))
      @south= set_bracket(Team.where(:region => "South"))
      @east= set_bracket(Team.where(:region => "East"))
      @midwest= set_bracket(Team.where(:region => "Midwest"))
    end
  end

  def leaderboard
    @order_by= params[:order_by]
    
    @user_teams = UserTeam.all
    
    @user_teams.sort! {|a,b| b.pts <=> a.pts}
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @user_teams }
    end
  end

end
