require 'test_helper'

class Api::ScoresControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_scores_index_url
    assert_response :success
  end

end
