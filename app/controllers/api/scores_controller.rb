class Api::ScoresController < ApplicationController
  def index
    @scores = Score.all.order(value: :desc).limit(5)
    render :index
  end

  def create
    @score = Score.new(score_params)
    if @score.save
      render :show
    else
      render :json ['Create new score failed.'], status: 422
    end
  end

  private

  def score_params
    params.require(:score).permit(:name, :value)
  end
end
