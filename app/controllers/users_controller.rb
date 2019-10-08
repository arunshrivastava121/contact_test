class UsersController < ApplicationController
    before_action :find_user, only: %i[update destroy]
    def index
        @users = User.order(:number)
        render json: @users
    end

    def create
        @user = User.new(user_params)
        if @user.save
            render json: { user: @user, message: "User successfully created."}
        else
            render json: { error: @user.error.full_messages }
        end
    end

    def update
        if @user.update(user_params)
            render json: { user: @user, message: "User successfully updated."}

        else
            render json: { error: @user.error.full_messages }
        end
    end

    def destroy
        @user.destroy
        render json: { message: "User Successfully destroyed."}
    end

    def find_duplicate
        @users = User.all
        User.group_by(:number).values do |users|
            users.pop
            users.each do |contact|
                contact.destroy
            end
        end
    end

    private

    def find_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:name, :address, :number)
    end
end
